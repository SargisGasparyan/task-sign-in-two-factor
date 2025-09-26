import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Input from '@components/ui/Input/Input';
import Button from '@components/ui/Button/Button';
import ErrorMessage from '@components/error-message/ErrorMessage';

import user from '@assets/icons/user.svg';
import pass from '@assets/icons/pass.svg';

import styles from './SignInPage.module.scss';
import { mockSignIn } from '../../api/auth';
import Header from '@components/header/Header';
import { resetTwoFA } from '@store/twoFaSlice';
import { useDispatch } from 'react-redux';

const SignInPage: React.FC = () => {
  // --- Local state ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- Navigation Dispatch---
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- React Query mutation for sign-in ---
  const { mutate, isPending, error } = useMutation({
    mutationFn: mockSignIn,
    onSuccess: (data) => {
      console.log('Successful login! Token:', data.token);
      dispatch(resetTwoFA());
      navigate('/two-fa');
    },
  });

  // --- Form submit handler ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <main className={styles.container}>
      <article className={styles.wrapper}>
        <Header title="Sign in to your account to continue" />
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            iconUrl={user}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            iconUrl={pass}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <section className={styles.errrWrapper}>
              <ErrorMessage message={(error as { message: string }).message} />
            </section>
          )}
          <Button type="submit" disabled={!email || !password || isPending}>
            {isPending ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
      </article>
    </main>
  );
};

export default SignInPage;
