import React from 'react';
import { useMutation } from '@tanstack/react-query';
import styles from './TwoFaPage.module.scss';
import TwoFactorAuth from '@components/two-fa/TwoFaAuth';
import { mockVerifyTwoFaCode } from '@api/twoFactor';
import Header from '@components/header/Header';
import { useNavigate } from 'react-router-dom';

const TwoFaPage: React.FC = () => {
  // --- React navigation hook ---
  const navigate = useNavigate();

  // --- React Query mutation for 2FA verification ---
  const { mutate, isPending, error } = useMutation({
    mutationFn: mockVerifyTwoFaCode,
    onSuccess: (data) => {
      console.log('2FA verified (mock):', data);
      alert('The code is correct! Token:' + data.token);
      navigate('/');
    },
    onError: (err) => {
      console.error('Ошибка 2FA:', err.message);
    },
  });

  // --- Handler for TwoFactorAuth verification, React 19 automatically stabilizes this function reference ::)
  const handleVerify = (code: string) => mutate(code);

  return (
    <main className={styles.container}>
      <article className={styles.wrapper}>
        <Header
          isExistBack={true}
          title="Two-Factor Authentication"
          description="Enter the 6-digit code from the Google Authenticator app"
        />

        <TwoFactorAuth
          errorMessage={error?.message}
          onVerify={handleVerify}
          isLoading={isPending}
        />
      </article>
    </main>
  );
};

export default React.memo(TwoFaPage);
