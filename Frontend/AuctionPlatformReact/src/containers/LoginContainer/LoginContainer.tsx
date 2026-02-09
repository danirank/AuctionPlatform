
import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { LoginUser } from "../../services/UserServices";

type LoginValues = {
  userNameOrEmail: string;
  password: string;
};

function LoginContainer() {
  const [values, setValues] = useState<LoginValues>({
    userNameOrEmail: "",
    password: "",
  });

  const [rootError, setRootError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: keyof LoginValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setRootError("");
  };

  const handleSubmit = async () => {
    setRootError("");

    try {
      setIsSubmitting(true);

      const loginResult = await LoginUser(values.userNameOrEmail.trim(), values.password);

      if (!loginResult) {
        setRootError("Inloggning misslyckades. Kontrollera dina uppgifter och försök igen.");
        return;
      }

      console.log("Login successful! Token:", loginResult);

      // TODO: navigera vidare (ex: /) och/eller spara token i auth-state
    } catch (err) {
      setRootError("Något gick fel. Försök igen.");
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginForm
      values={values}
      rootError={rootError}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export default LoginContainer;
