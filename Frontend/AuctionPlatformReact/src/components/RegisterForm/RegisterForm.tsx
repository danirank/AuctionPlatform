import styles from "./RegisterForm.module.css";

type FormValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

type Props = {
  values: FormValues;
  errors: FieldErrors;
  rootError: string;
  isSubmitting: boolean;

  onChange: (name: keyof FormValues, value: string) => void;
  onBlur: (name: keyof FormValues) => void;
  onSubmit: () => void;
};

function RegisterForm({
  values,
  errors,
  rootError,
  isSubmitting,
  onChange,
  onBlur,
  onSubmit,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const inputProps = (name: keyof FormValues) => ({
    name,
    value: values[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(name, e.target.value),
    onBlur: () => onBlur(name),
    "aria-invalid": !!errors[name],
    required: true,
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h2>Registrera dig</h2>

        {rootError && (
          <p className={styles.formError} role="alert">
            {rootError}
          </p>
        )}

        <div className={styles.field}>
          <input type="text" placeholder="Förnamn" {...inputProps("firstName")} />
          {errors.firstName && <p className={styles.errorText}>{errors.firstName}</p>}
        </div>

        <div className={styles.field}>
          <input type="text" placeholder="Efternamn" {...inputProps("lastName")} />
          {errors.lastName && <p className={styles.errorText}>{errors.lastName}</p>}
        </div>

        <div className={styles.field}>
          <input type="text" placeholder="Användarnamn" {...inputProps("username")} />
          {errors.username && <p className={styles.errorText}>{errors.username}</p>}
        </div>

        <div className={styles.field}>
          <input type="email" placeholder="E-post" {...inputProps("email")} />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Lösenord"
            autoComplete="new-password"
            {...inputProps("password")}
          />
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Bekräfta lösenord"
            autoComplete="new-password"
            {...inputProps("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className={styles.errorText}>{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrerar..." : "Registrera"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
