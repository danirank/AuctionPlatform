import styles from "./RegisterForm.module.css";
import type { RegisterUserType } from "../../types/Types";
import { useForm } from "react-hook-form";
import { RegisterUser, LoginUser } from "../../services/UserServices";

type FormValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    const newUser: RegisterUserType = {
      userName: data.username.trim(),
      email: data.email.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      password: data.password,
      isAdmin: false,
    };

    try {
      const registerResult = await RegisterUser(newUser);

      if (!registerResult) {
        setError("root", { message: "Något gick fel, försök igen." });
        return;
      }

      const loginResult = await LoginUser(newUser.userName, newUser.password);

      if (!loginResult) {
        setError("root", {
          message: "Användare registrerad men inloggning misslyckades.",
        });
        console.error(
          "Login failed after registration for user:",
          newUser.userName,
          "Response:",
          loginResult
        );
        return;
      }

      // TODO: här kan du t.ex. navigera bort istället för alert
      alert("Användare registrerad och inloggad!");
    } catch (err) {
      // Om din backend skickar specifika fel, kan du mappa dem här till fält:
      // setError("email", { message: "E-post används redan." });
      setError("root", { message: "Något gick fel. Försök igen." });
      console.error("Register error:", err);
    }
  };

  return (
 
    <div className={styles.container}>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>Registrera dig</h2>

      {errors.root?.message && (
        <p className={styles.formError} role="alert">
          {errors.root.message}
        </p>
      )}

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Förnamn"
          {...register("firstName", { required: "Fyll i förnamn." })}
          aria-invalid={!!errors.firstName}
          />
        {errors.firstName && (
            <p className={styles.errorText} role="alert">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Efternamn"
          {...register("lastName", { required: "Fyll i efternamn." })}
          aria-invalid={!!errors.lastName}
          />
        {errors.lastName && (
            <p className={styles.errorText} role="alert">
            {errors.lastName.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Användarnamn"
          {...register("username", {
              required: "Fyll i användarnamn.",
              minLength: { value: 3, message: "Minst 3 tecken." },
            })}
            aria-invalid={!!errors.username}
            />
        {errors.username && (
            <p className={styles.errorText} role="alert">
            {errors.username.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="E-post"
          autoComplete="username"
          {...register("email", {
              required: "Fyll i e-post.",
              pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Ogiltig e-postadress.",
                },
            })}
            aria-invalid={!!errors.email}
            />
        {errors.email && (
            <p className={styles.errorText} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Lösenord"
          autoComplete="new-password"
          {...register("password", {
              required: "Fyll i lösenord.",
              minLength: { value: 8, message: "Minst 8 tecken." },
            })}
            aria-invalid={!!errors.password}
            />
        {errors.password && (
            <p className={styles.errorText} role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Bekräfta lösenord"
          autoComplete="new-password"
          {...register("confirmPassword", {
              required: "Bekräfta lösenord.",
              validate: (v) => v === password || "Lösenorden matchar inte.",
            })}
            aria-invalid={!!errors.confirmPassword}
            />
        {errors.confirmPassword && (
            <p className={styles.errorText} role="alert">
            {errors.confirmPassword.message}
          </p>
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
