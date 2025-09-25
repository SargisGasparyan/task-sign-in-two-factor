import React, {
  useRef,
  useCallback,
  useMemo,
  type KeyboardEvent,
  type FormEvent,
  type ChangeEvent,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@store/store";
import { setTwoFa, setShowCountdown, setIsWriting } from "@store/twoFaSlice";
import { useCountdown } from "@hooks/useCountDown";

import Button from "@components/ui/Button/Button";
import styles from "./TwoFaAuth.module.scss";

interface TwoFactorAuthProps {
  length?: number; // default 6
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
  const twoFaCode = useSelector(
    (state: RootState) => state.twoFactor.twoFaCode
  );
  const showCountdown = useSelector(
    (state: RootState) => state.twoFactor.showCountdown
  );

  const isWriting = useSelector(
    (state: RootState) => state.twoFactor.isWriting
  );

  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { formattedTime, isZero, reset } = useCountdown(5);

  const isEmptyInput = useMemo(
    () => twoFaCode.every((v) => v === ""),
    [twoFaCode]
  );

  // Button text
  const btnText = useMemo(() => {
    if (isLoading) return "Checking…";
    if (isEmptyInput) return "Get now";
    return "Continue";
  }, [isLoading, isEmptyInput]);

  // Input change
  const handleChange = useCallback(
    (index: number, val: string) => {
      if (!/^\d?$/.test(val)) return;
      const nextValues = [...twoFaCode];
      nextValues[index] = val;
      dispatch(setTwoFa(nextValues));
      if (val && index < length - 1) inputsRef.current[index + 1]?.focus();
    },
    [dispatch, twoFaCode, length]
  );

  // Backspace navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !twoFaCode[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    },
    [twoFaCode]
  );

  // Form submit
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(setIsWriting(false));

      if (isEmptyInput && !showCountdown) {
        // "Get now" clicked
        dispatch(setShowCountdown(true));
        dispatch(setIsWriting(true));

        reset();
        return;
      }

      const code = twoFaCode.join("");
      if (code.length === length && !isLoading) {
        dispatch(setShowCountdown(false));
        reset();

        onVerify(code);
      }
    },
    [
      twoFaCode,
      length,
      isLoading,
      onVerify,
      isEmptyInput,
      showCountdown,
      dispatch,
      reset,
    ]
  );
  console.log(errorMessage, showCountdown, "infoo");
  useEffect(() => {
    if (isZero) dispatch(setShowCountdown(false));
  }, [isZero, dispatch]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        {twoFaCode.map((val, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el!;
            }}
            className={styles.input}
            type="text"
            inputMode="numeric"
            aria-invalid={!!errorMessage && !showCountdown && !isWriting}
            maxLength={1}
            value={val}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(i, e.target.value)
            }
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
        ))}
      </div>

      {showCountdown && isEmptyInput ? (
        <p className={styles.countDown}>Get a new code in {formattedTime}</p>
      ) : (
        <Button type="submit" disabled={isLoading || isSuccess}>
          {btnText}
        </Button>
      )}
    </form>
  );
};

export default React.memo(TwoFactorAuth);
