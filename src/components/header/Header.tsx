import React from 'react';
import logo from '@assets/icons/logo.svg';
import back from '@assets/icons/back.svg';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  description?: string;
  isExistBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, description, isExistBack }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.infoWrapper}>
      {isExistBack && (
        <figure className={styles.backBtn} onClick={() => navigate(-1)}>
          <img src={back} alt="Go to back" />
        </figure>
      )}
      <article className={styles.logoWrapper}>
        <figure>
          <img src={logo} alt="Logo-image" />
        </figure>
        <p className={styles.companyName}>Company</p>
      </article>

      <h1 className={styles.title}>{title}</h1>

      {description && <p className={styles.desc}>{description}</p>}
    </header>
  );
};

export default React.memo(Header);
