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




async function uploadAuctionImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  
  const uploadUrl = "https://localhost:7063/api/uploads/images";

  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData, // ingen Content-Type här
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Upload failed");
  }

  return (await res.json()) as { url: string };
}


export async function CreateAuction(auction: CreateAuctionType, imageFile?: File | null) {
  const url = "https://localhost:7063/api/auction";
  const token = localStorage.getItem("token") ?? "";

  // 1) upload (om fil finns) och sätt imageUrl
  if (imageFile) {
    const uploaded = await uploadAuctionImage(imageFile);
    auction = { ...auction, imageUrl: uploaded.url };
  }

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

