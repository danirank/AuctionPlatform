import { useState } from "react";
import UpdatePassword from "../../components/UpdatePassword/UpdatePassword";
import type { UpdatePasswordType } from "../../types/Types";
import { UpdatePassword as UpdatePasswordService } from '../../services/UserService/UserServices'
import { useAuth } from "../../context/AuthProvider";



type FieldErrors = Partial<Record<keyof UpdatePasswordType, string>>;

function UpdatePasswordContainer() {
const {refreshUser} = useAuth();
  const [values, setValues] = useState<UpdatePasswordType>({
    oldPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [rootError, setRootError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: keyof UpdatePasswordType, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name: keyof UpdatePasswordType) => {
    if (!values[name].trim()) {
      setErrors((prev) => ({ ...prev, [name]: "Fältet är obligatoriskt" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: FieldErrors = {};

    if (!values.oldPassword.trim())
      newErrors.oldPassword = "Ange nuvarande lösenord";

    if (!values.newPassword.trim())
      newErrors.newPassword = "Ange nytt lösenord";

    if (values.newPassword.length < 6)
      newErrors.newPassword = "Minst 6 tecken";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
  setRootError("");

  if (!validate()) return;

  try {
    setIsSubmitting(true);

    await UpdatePasswordService(values);
    await refreshUser();

    
    alert("Lösenord uppdaterat!");

  } catch (err: any) {
    setRootError(err.message || "Något gick fel");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <UpdatePassword
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

export default UpdatePasswordContainer;
