import React from 'react';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>Page not found</p>
      <Link to="/" className={styles.link}>
        Go to home page
      </Link>
    </section>
  );
};

export default NotFound;
