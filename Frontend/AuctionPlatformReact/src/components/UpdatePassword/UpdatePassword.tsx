import React from "react";
import type { UpdatePasswordType } from "../../types/Types";
import styles from './UpdatePassword.module.css'

type FieldErrors = Partial<Record<keyof UpdatePasswordType, string>>;

type Props = {
  values: UpdatePasswordType;
  errors: FieldErrors;
  rootError: string;
  isSubmitting: boolean;

  onChange: (name: keyof UpdatePasswordType, value: string) => void;
  onBlur: (name: keyof UpdatePasswordType) => void;
  onSubmit: () => void;
};

function UpdatePassword({
  values,
  errors,
  rootError,
  isSubmitting,
  onChange,
  onBlur,
  onSubmit,
}: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const inputProps = (name: keyof UpdatePasswordType) => ({
    name,
    value: values[name] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(name, e.target.value),
    onBlur: () => onBlur(name),
    "aria-invalid": !!errors[name],
    required: true,
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h2>Ändra lösenord</h2>

        {rootError && (
          <p className={styles.formError} role="alert">
            {rootError}
          </p>
        )}

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Nuvarande lösenord"
            autoComplete="current-password"
            {...inputProps("oldPassword")}
          />
          {errors.oldPassword && (
            <p className={styles.errorText}>{errors.oldPassword}</p>
          )}
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Nytt lösenord"
            autoComplete="new-password"
            {...inputProps("newPassword")}
          />
          {errors.newPassword && (
            <p className={styles.errorText}>{errors.newPassword}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uppdaterar..." : "Uppdatera lösenord"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;
