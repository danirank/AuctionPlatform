import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

export function checkAdmin() {
const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === null) return;

    if (!isLoggedIn) {
      navigate("/login", { replace: true });
      return;
    }

    if (!user) return;

    const isAdmin = user?.roles?.includes("Admin") ?? false;

    if (!isAdmin) {
      navigate("/forbidden", { replace: true });
      return;
    }
  }, [user, isLoggedIn, navigate]);
}