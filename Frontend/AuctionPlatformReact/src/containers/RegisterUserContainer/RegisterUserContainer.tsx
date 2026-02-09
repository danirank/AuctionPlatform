import { useState } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import type { RegisterUserType } from "../../types/Types";
import {LoginUser } from "../../services/AuthService/AuthService";
import { RegisterUser } from "../../services/UserServices";

type FormValues = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

function RegisterUserContainer() {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [rootError, setRootError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const validateField = (name: keyof FormValues, value: string) => {
    const v = value.trim();

    switch (name) {
      case "firstName":
        return v ? "" : "Fyll i förnamn.";

      case "lastName":
        return v ? "" : "Fyll i efternamn.";

      case "username":
        if (!v) return "Fyll i användarnamn.";
        if (v.length < 3) return "Minst 3 tecken.";
        return "";

      case "email":
        if (!v) return "Fyll i e-post.";
        if (!/^\S+@\S+\.\S+$/.test(v)) return "Ogiltig e-postadress.";
        return "";

      case "password":
        if (!value) return "Fyll i lösenord.";
        if (value.length < 8) return "Minst 8 tecken.";
        return "";

      case "confirmPassword":
        if (!value) return "Bekräfta lösenord.";
        if (value !== values.password) return "Lösenorden matchar inte.";
        return "";

      default:
        return "";
    }
  };

  const validateAll = () => {
    const nextErrors: FieldErrors = {};

    (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
      const msg = validateField(key, values[key]);
      if (msg) nextErrors[key] = msg;
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

 

  const handleChange = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setRootError("");

    if (errors[name]) {
      const msg = validateField(name, value);

      setErrors((prev) => ({
        ...prev,
        [name]: msg || undefined,
      }));
    }
  };

  const handleBlur = (name: keyof FormValues) => {
    const msg = validateField(name, values[name]);

    setErrors((prev) => ({
      ...prev,
      [name]: msg || undefined,
    }));
  };

  

  const handleSubmit = async () => {
    setRootError("");

    if (!validateAll()) return;

    const newUser: RegisterUserType = {
      userName: values.username.trim(),
      email: values.email.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      password: values.password,
      isAdmin: false,
    };

    try {
      setIsSubmitting(true);

      const registered = await RegisterUser(newUser);

      if (!registered) {
        setRootError("Något gick fel, försök igen.");
        return;
      }

      const loggedIn = await LoginUser(
        newUser.userName,
        newUser.password
      );

      if (!loggedIn) {
        setRootError("Registrerad men inloggning misslyckades.");
        return;
      }

      alert("Användare registrerad och inloggad!");
    } catch {
      setRootError("Något gick fel. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <RegisterForm
      values={values}
      errors={errors}
      rootError={rootError}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
}

export default RegisterUserContainer;
