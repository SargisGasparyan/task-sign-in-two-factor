import React, { useState, type InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import eyeOpen from '@assets/icons/eye-opened.svg';
import eyeClosed from '@assets/icons/eye-closed.svg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  iconUrl?: string;
}

const Input: React.FC<InputProps> = ({ label, iconUrl, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [innerValue, setInnerValue] = useState('');
  const isPassword = type === 'password';

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInnerValue(e.target.value);
    props.onChange?.(e);
  };

  return (
    <section className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <article className={styles.inputContainer}>
        {iconUrl && <img src={iconUrl} alt="input-icon" className={styles.icon} />}

        <input
          {...props}
          className={styles.input}
          type={isPassword && showPassword ? 'text' : type}
          onChange={handleChange}
        />

        {isPassword && innerValue && (
          <button
            type="button"
            onClick={togglePassword}
            className={styles.eyeBtn}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <img
              src={showPassword ? eyeOpen : eyeClosed}
              alt={showPassword ? 'Hide password' : 'Show password'}
              className={styles.eyeIcon}
            />
          </button>
        )}
      </article>
    </section>
  );
};

export default Input;
