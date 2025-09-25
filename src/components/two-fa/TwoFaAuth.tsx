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
import { setTwoFa } from "@store/twoFaSlice";
import { useCountdown } from "@hooks/useCountDown";

import Button from "@components/ui/Button/Button";
import styles from "./TwoFaAuth.module.scss";

interface TwoFactorAuthProps {
  length?: number; // default 6
  onVerify: (code: string) => void; // called when user submits full code
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
  const [btnText, setButtonText] = React.useState("Continue");

  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { formattedTime, isZero } = useCountdown(10);

  const isEmptyInput = useMemo(
    () => twoFaCode.every((v) => v === ""),
    [twoFaCode]
  );
  const isGetNow = isEmptyInput && isZero;

  useEffect(() => {
    if (isLoading) {
      setButtonText("Checking…");
    } else if (isEmptyInput) {
      setButtonText("Get now");
    } else {
      setButtonText("Continue");
    }
  }, [isLoading, isSuccess, errorMessage, isEmptyInput]);

  console.log(btnText, "btnText");
  const handleChange = useCallback(
    (index: number, val: string) => {
      if (!/^\d?$/.test(val)) return;
      const nextValues = [...twoFaCode];
      nextValues[index] = val;
      dispatch(setTwoFa(nextValues));
      if (val && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    },
    [dispatch, twoFaCode, length]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !twoFaCode[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    },
    [twoFaCode]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const code = twoFaCode.join("");

      if (isGetNow) {
        // Logic for "Get Now" — request new 2FA code
        console.log("Request new code");
        // You can dispatch something like: dispatch(requestNewTwoFA())
        return;
      }

      if (code.length === length && !isLoading) {
        // Logic for "Continue" — verify code
        onVerify(code);
      }
    },
    [twoFaCode, length, isLoading, onVerify, isEmptyInput, isZero]
  );
  const renderInputs = () =>
    twoFaCode.map((v, i) => (
      <input
        key={i}
        ref={(el) => {
          if (el) inputsRef.current[i] = el;
        }}
        className={styles.input}
        type="text"
        inputMode="numeric"
        aria-invalid={!!errorMessage}
        maxLength={1}
        value={v}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(i, e.target.value)
        }
        onKeyDown={(e) => handleKeyDown(e, i)}
      />
    ));

  const renderAction = () => {
    if (!isZero && isEmptyInput) {
      // Show countdown
      return (
        <p className={styles.countDown}>Get a new code in {formattedTime}</p>
      );
    }

    // Otherwise show button
    return (
      <Button type="submit" disabled={isLoading || isSuccess}>
        {btnText}
      </Button>
    );
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputs}>{renderInputs()}</div>

      {renderAction()}
    </form>
  );
};

export default React.memo(TwoFactorAuth);
