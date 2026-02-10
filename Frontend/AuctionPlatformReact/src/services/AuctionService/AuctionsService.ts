import type { AuctionType, CreateAuctionType } from "../../types/Types";



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
  const token = localStorage.getItem("token") ?? "";

  
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


