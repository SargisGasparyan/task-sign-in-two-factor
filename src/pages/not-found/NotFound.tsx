import React from 'react';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>Страница не найдена</p>
      <Link to="/" className={styles.link}>
        На главную
      </Link>
    </section>
  );
};

export default NotFound;
