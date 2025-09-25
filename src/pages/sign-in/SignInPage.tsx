// SignInPage.tsx
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./SignInPage.module.scss";
import Input from "@components/ui/Input/Input";
import Button from "@components/ui/Button/Button";
import logo from "@assets/icons/logo.svg";
import user from "@assets/icons/user.svg";
import pass from "@assets/icons/pass.svg";

import styles from "./SignInPage.module.scss";
import { mockSignIn } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "@components/error-message/ErrorMessage";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: mockSignIn,
    onSuccess: (data) => {
      console.log("Успешный вход! Токен:", data.token);
      navigate("/two-fa");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
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
            <ErrorMessage message={(error as { message: string }).message} />
          )}

          <Button type="submit" disabled={!email || !password || isPending}>
            {isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </article>
    </main>
  );
};

export default SignInPage;
