import type { LoginResponseType, RegisterUserType, SetUserStatusType, UpdatePasswordType, UserTableType } from '../../types/Types';
import type { UserType } from '../../types/Types';
import { authService } from '../AuthService/AuthService';



export async function RegisterUser(dto: RegisterUserType) {
    const url = "https://localhost:7063/api/user";
    
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

export async function GetUser(id: string) {
    const url = `https://localhost:7063/user/${id}`;
  const token = authService.getToken();
    const user: UserType = await fetch(url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }   
        }


    ).then(result => result.json());
if (!user) {
  throw new Error("User not found");
}

    return await user;
}


export async function GetUsers() {
  const url = `https://localhost:7063/allUsers`
  const token = authService.getToken();

  const users: UserTableType[] = await 
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }

    }).then(respone => respone.json()); 


    return users; 

}

export async function SetUserStatus({userId, isActive}: SetUserStatusType) {
  
  const url = `https://localhost:7063/api/User?userId=${userId}`
  const token = authService.getToken();
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`
    }, 
    body: JSON.stringify({isActive})
      
  });

  console.log(response); 
  return response.json(); 

}

export async function UpdatePassword({
  oldPassword,
  newPassword,
}: UpdatePasswordType) {
  const token = authService.getToken();

  if (!token) {
    throw new Error("Ingen token hittades. Logga in igen.");
  }

  const url = "https://localhost:7063/user/update";

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  
  const result :LoginResponseType = await response.json();

  if (!response.ok) {
    
    throw new Error(result?.error || "Kunde inte uppdatera lösenord");
  }

  
  if (result?.token && result?.isActive) {
    authService.clearToken();
    authService.setToken(result.token);
  }

  return result;
}



