// src/services/authService.ts
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";
const AUTH_EVENT = "auth:changed";

type JwtPayload = {
  exp?: number; // sekunder (unix time)
};

function isTokenValid(token: string | null): boolean {
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true; // om exp saknas: behandla som giltig (eller välj false om du vill)
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export const authService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    window.dispatchEvent(new Event(AUTH_EVENT)); 
  },

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  },

  async isLoggedIn(): Promise<boolean> {
    const token = this.getToken();
    return isTokenValid(token);
  },

    getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.sub || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
    } catch (e) {
        console.error("Error decoding token:", e);
        return null;
    }
    },

  onAuthChange(handler: () => void): () => void {
    const listener = () => handler();

    // samma flik
    window.addEventListener(AUTH_EVENT, listener);
    // andra flikar
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener(AUTH_EVENT, listener);
      window.removeEventListener("storage", listener);
    };
  },
};


export async function LoginUser(usernameOrEmail: string, password: string) {
    const url = "https://localhost:7063/login"
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({usernameOrEmail, password})
    });
    const result = await response.json();
    if(response.ok) {
        await authService.setToken(result.token);
        return true;
    } else {
        return false;
    }
   
}


 



