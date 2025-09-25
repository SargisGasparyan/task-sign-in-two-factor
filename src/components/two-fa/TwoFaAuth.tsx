import React, {
  useRef,
  useEffect,
  type KeyboardEvent,
  type FormEvent,
  type ChangeEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@store/store';
import { setTwoFa, setShowCountdown, setIsWriting } from '@store/twoFaSlice';
import { useCountdown } from '@components/ui/hooks/useCountDown';
import Button from '@components/ui/Button/Button';
import styles from './TwoFaAuth.module.scss';

interface TwoFactorAuthProps {
  length?: number;
  onVerify: (code: string) => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  errorMessage?: string;
}

const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({
  length = 6,
  onVerify,
  isLoading = false,
  isSuccess = false,
  errorMessage,
}) => {
  const dispatch = useDispatch();

  // --- Redux state ---
  const { twoFaCode, showCountdown, isWriting } = useSelector(
    (state: RootState) => state.twoFactor
  );

  // --- Countdown hook (5 sec) ---
  const { formattedTime, isZero, reset } = useCountdown(5);

  // --- Refs ---
  const inputsRef = useRef<HTMLInputElement[]>([]);

  // --- Derived state ---
  // Cheap calculations: React 19 compiler keeps them efficient.
  const isEmpty = twoFaCode.every((v) => v === '');
  const buttonLabel = isLoading ? 'Checking…' : isEmpty ? 'Get now' : 'Continue';

  // --- Handlers ---
  // Move focus to the next input
  const focusNext = (index: number) => {
    inputsRef.current[index + 1]?.focus();
  };

  // Handle single-digit input and auto-advance focus
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...twoFaCode];
    updated[index] = value;
    dispatch(setTwoFa(updated));
    if (value && index < length - 1) focusNext(index);
  };

  // Handle backspace navigation to the previous input
  const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !twoFaCode[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Submit logic:
  //  • First click shows countdown
  //  • Subsequent click verifies the code
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setIsWriting(false));

    if (isEmpty && !showCountdown) {
      dispatch(setShowCountdown(true));
      dispatch(setIsWriting(true));
      reset();
      return;
    }

    const code = twoFaCode.join('');
    if (code.length === length && !isLoading) {
      dispatch(setShowCountdown(false));
      reset();
      onVerify(code);
    }
  };

  // Hide countdown when timer ends
  useEffect(() => {
    if (isZero) dispatch(setShowCountdown(false));
  }, [isZero, dispatch]);

  // --- Render ---
  // Generate the individual input boxes
  const renderInputs = () =>
    twoFaCode.map((val, i) => (
      <input
        key={i}
        ref={(el) => void (inputsRef.current[i] = el!)}
        className={styles.input}
        type="text"
        inputMode="numeric"
        maxLength={1}
        aria-invalid={!!errorMessage && !showCountdown && !isWriting}
        value={val}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(i, e.target.value)}
        onKeyDown={(e) => handleBackspace(e, i)}
      />
    ));

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputs}>{renderInputs()}</div>

      {showCountdown && isEmpty ? (
        <p className={styles.countDown}>Get a new code in {formattedTime}</p>
      ) : (
        <Button type="submit" disabled={isLoading || isSuccess}>
          {buttonLabel}
        </Button>
      )}
    </form>
  );
};

// Memoized to prevent unnecessary parent re-renders
export default React.memo(TwoFactorAuth);
