import styles from "./LoginForm.module.css";
import { useRef } from "react";

interface Props {
  handleSubmit: (userNameOrEmail: string, password: string) => void | Promise<void>;
}

function LoginForm({ handleSubmit }: Props) {
  const userNameOrEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userNameOrEmail = userNameOrEmailRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";

    await handleSubmit(userNameOrEmail, password);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <h2>Logga in</h2>

        <input
          type="text"
          placeholder="Användarnamn eller email"
          className={styles.input}
          ref={userNameOrEmailRef}
          autoComplete="username"
          required
        />

        <input
          type="password"
          placeholder="Lösenord"
          className={styles.input}
          ref={passwordRef}
          autoComplete="current-password"
          required
        />

        <button type="submit" className={styles.button}>
          Logga in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
