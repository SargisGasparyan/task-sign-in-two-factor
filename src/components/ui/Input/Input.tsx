import React, { type InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  iconUrl?: string;
}

const Input: React.FC<InputProps> = ({ label, iconUrl, ...props }) => {
  return (
    <section className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <article className={styles.inputContainer}>
        {iconUrl && (
          <img src={iconUrl} alt="input-icon" className={styles.icon} />
        )}
        <input className={styles.input} {...props} />
      </article>
    </section>
  );
};

export default Input;
