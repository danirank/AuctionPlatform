
import type { AuctionType, CreateAuctionType, SetAuctionStatusType, UpdateAuctionType } from "../../types/Types";
import { authService } from "../AuthService/AuthService";



export async function GetAllOpenAuctions() {
    const url = "https://localhost:7063/open/all"

    const auctions:AuctionType[] = await fetch(url).then(result => result.json())

    return await auctions;
}

export async function GetOpenAuctionsSearch(titleSearch :string) {
    const url = `https://localhost:7063/open/search?search=${encodeURIComponent(titleSearch)}`

    const auctions:AuctionType[] = await fetch(url).then(result => result.json())

    return await auctions;
}

export async function GetAllAuctionsSearch(titleSearch :string) {
    const url = `https://localhost:7063/all/search?search=${encodeURIComponent(titleSearch)}`

    const auctions:AuctionType[] = await fetch(url).then(result => result.json())

    return await auctions;
}


export async function GetAllAuctions() {
    const url = "https://localhost:7063/all"

    const auctions:AuctionType[] = await fetch(url).then(result => result.json())

    return await auctions;
}

export async function GetById(auctionId: number) {
    const url = `https://localhost:7063/auctions/${auctionId}`

    const auction: AuctionType = await fetch(url).then(res => res.json());

    return await auction
}


export async function CreateAuction(auction: CreateAuctionType) {
  const url = "https://localhost:7063/api/auction";
  const token = authService.getToken();

  
  // 2) skapa auktion
  const response = await fetch(url, {
      method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(auction),
});

if (!response.ok) {
    const errorText = await response.text();
    console.error("CreateAuction failed:", response.status, response.statusText, errorText);
    throw new Error(`Failed to create auction: ${errorText}`);
}

const responseData = await response.json();
console.log("CreateAuction response:", responseData);

return responseData;
}


export async function UpdateAuction(
    auctionId: number,
    auction: UpdateAuctionType
) {
  const url = `https://localhost:7063/api/Auction?auctionId=${auctionId}`;
  const token = authService.getToken();

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(auction),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("UpdateAuction failed:", response.status, errorText);
    throw new Error(`Failed to update auction: ${errorText}`);
  }

  const responseData = await response.json();
  console.log("UpdateAuction response:", responseData);

  return responseData;
}

export async function SetAuctionStatus ({auctionId, isDeactivatedByAdmin }: SetAuctionStatusType) {
    //console.log(isDeactivatedByAdmin, "från service")
    const url = `https://localhost:7063/deactivate?auctionId=${auctionId}`
  const token = authService.getToken();
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type":"application/json",
      Authorization: `Bearer ${token}`
    }, 
    body: JSON.stringify({isDeactivatedByAdmin})
      
  });
    //console.log(isDeactivatedByAdmin, "från service")


 if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || `Request failed: ${response.status}`);
  }

  return await response.json();
}


