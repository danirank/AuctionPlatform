import LoginForm from "../../components/LoginForm/LoginForm";
import { LoginUser } from "../../services/UserServices";

function LoginContainer() {
  const handleLogin = async (userNameOrEmail: string, password: string) => {
    const loginResult = await LoginUser(userNameOrEmail.trim(), password);

    if (!loginResult) {
      alert("Inloggning misslyckades. Kontrollera dina uppgifter och försök igen.");
      return;
    }

    // TODO: navigera vidare (ex: /) och/eller spara token i auth-state
  };

  return <LoginForm handleSubmit={handleLogin} />;
}

export default LoginContainer;
