import type { RegisterUserType } from '../types/Types';


export async function RegisterUser(dto: RegisterUserType) {
    const url = "https://localhost:7063/api/user";
    // const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(user)
    // });
    // return await response.json();
    const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(dto),
});

const contentType = res.headers.get("content-type") ?? "";
const bodyText = await res.text(); // <-- läs som text först

if (!res.ok) {
  console.error("HTTP", res.status, res.statusText, bodyText);
  throw new Error(bodyText);
}

if (!contentType.includes("application/json")) {
  console.error("Expected JSON but got:", contentType, bodyText);
  throw new Error("API returned non-JSON");
}
console.log("API response:", bodyText); 

return JSON.parse(bodyText);


}





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
        await SaveToken(result.token);
        return true;
    } else {
        return false;
    }
   
}

export async function SaveToken(token: string) {
    localStorage.setItem("token", token);
}

export async function GetToken() {
    return localStorage.getItem("token");
}   

export async function LogoutUser() {
    localStorage.removeItem("token");
}   


