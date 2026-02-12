import { useState } from "react";
import {  useNavigate } from "react-router";
import LoginForm from "../../components/LoginForm/LoginForm";
import { LoginUser } from "../../services/AuthService/AuthService";
import { useAuth } from "../../context/AuthProvider";

type LoginValues = {
  userNameOrEmail: string;
  password: string;
};

function LoginContainer() {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

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
    setIsSubmitting(true);

    try {
      const loginResult = await LoginUser(
        values.userNameOrEmail.trim(),
        values.password
      );

     
      

      if (!loginResult.isActive) {
        setRootError("Kontot inaktiverat av admin")
        navigate("/deactivated" , {replace: true})
        
        return;
      }

      
      await refreshUser();

      navigate("/", { replace: true });
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
