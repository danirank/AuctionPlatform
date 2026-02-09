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





