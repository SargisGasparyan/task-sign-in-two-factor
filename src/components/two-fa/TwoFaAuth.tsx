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
  const [btnText, setButtonText] = React.useState("Get now");

  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { formattedTime, isZero } = useCountdown(10);

  const isEmptyInput = useMemo(
    () => twoFaCode.every((v) => v === ""),
    [twoFaCode]
  );

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
      if (!/^\d?$/.test(val)) return; // allow only digits or empty
      const nextValues = [...twoFaCode];
      nextValues[index] = val;
      dispatch(setTwoFa(nextValues));
      if (val && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    },
    [dispatch, twoFaCode, length]
  );

  //  useEffect(()=>{
  //     if(btnText==="Get now"){

  //     }
  //   },[btnText])

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
      if (code.length === length && !isLoading) {
        onVerify(code);
      }
    },
    [twoFaCode, length, isLoading, onVerify]
  );

  const buttonText = useMemo(() => {
    if (isLoading) return "Checking…";
    return isEmptyInput ? "Get now" : "Continue";
  }, [isLoading, isSuccess, isEmptyInput]);

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

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputs}>{renderInputs()}</div>

      {!isZero && isEmptyInput && (
        <p className={styles.countDown}>Get a new code in {formattedTime}</p>
      )}

      {(isZero || !isEmptyInput) && (
        <Button type="submit" disabled={isLoading || isSuccess}>
          {btnText}
        </Button>
      )}
    </form>
  );
};

export default React.memo(TwoFactorAuth);
