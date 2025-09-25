import React, { useState } from 'react';
import './SignInPage.module.scss';
import Input from '@components/ui/Input/Input';
import Button from '@components/ui/Button/Button';
import logo from '@assets/logo.svg';
import userIcon from '@assets/icons/user.svg';

import styles from './SignInPage.module.scss';

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <main className={styles.container}>
      <article className={styles.wrapper}>
        <section className={styles.infoWrapper}>
          <article className={styles.logoWrapper}>
            <figure>
              <img src={logo} alt="logo-image" />
            </figure>
            <p className={styles.companyName}>Company</p>
          </article>
          <h1 className={styles.title}>Sign in to your account to continue</h1>
        </section>
        <section>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              iconUrl={userIcon}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={!email || !password}>
              Log in
            </Button>
          </form>
        </section>
      </article>
    </main>
  );
};

export default SignInPage;
