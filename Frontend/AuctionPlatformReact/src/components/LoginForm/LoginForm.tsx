// src/components/LoginForm/LoginForm.tsx
import styles from "./LoginForm.module.css";

type LoginValues = {
  userNameOrEmail: string;
  password: string;
};

interface Props {
  values: LoginValues;
  rootError: string;
  isSubmitting: boolean;

  onChange: (name: keyof LoginValues, value: string) => void;
  onSubmit: () => void | Promise<void>;
}

function LoginForm({ values, rootError, isSubmitting, onChange, onSubmit }: Props) {
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit} noValidate>
        <h2>Logga in</h2>

        {rootError && (
          <p className={styles.formError} role="alert">
            {rootError}
          </p>
        )}

        <input
          type="text"
          name="userNameOrEmail"
          placeholder="Användarnamn eller email"
          className={styles.input}
          value={values.userNameOrEmail}
          onChange={(e) => onChange("userNameOrEmail", e.target.value)}
          autoComplete="username"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Lösenord"
          className={styles.input}
          value={values.password}
          onChange={(e) => onChange("password", e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Loggar in..." : "Logga in"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
