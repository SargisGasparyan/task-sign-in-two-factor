import React from 'react';
import { useMutation } from '@tanstack/react-query';
import logo from '@assets/icons/logo.svg';
import styles from './TwoFaPage.module.scss';
import TwoFactorAuth from '@components/two-fa/TwoFaAuth';
import ErrorMessage from '@components/error-message/ErrorMessage';
import { useSelector } from 'react-redux';
import type { RootState } from '@store/store';
import { mockVerifyTwoFaCode } from '@api/twoFactor';

const TwoFaPage: React.FC = () => {
  // --- Redux state (destructured) ---
  const { showCountdown, isWriting } = useSelector((state: RootState) => state.twoFactor);

  // --- React Query mutation for 2FA verification ---
  const { mutate, isPending, error } = useMutation({
    mutationFn: mockVerifyTwoFaCode,
    onSuccess: (data) => {
      console.log('2FA verified (mock):', data);
      alert('Код верный! Токен: ' + data.token);
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
        <section className={styles.infoWrapper}>
          <article className={styles.logoWrapper}>
            <figure>
              <img src={logo} alt="logo-image" />
            </figure>
            <p className={styles.companyName}>Company</p>
          </article>
          <p className={styles.title}>Two-Factor Authentication</p>
          <p className={styles.desc}>Enter the 6-digit code from the Google Authenticator app</p>
        </section>

        <TwoFactorAuth
          errorMessage={error?.message}
          onVerify={handleVerify}
          isLoading={isPending}
        />

        {error && !showCountdown && !isWriting && (
          <ErrorMessage message={(error as { message: string }).message} />
        )}
      </article>
    </main>
  );
};

export default React.memo(TwoFaPage);
