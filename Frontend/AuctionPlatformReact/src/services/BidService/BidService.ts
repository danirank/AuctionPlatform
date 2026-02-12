
import type { BidType, DeleteBidType, MakeBidRequest, MakeBidType } from "../../types/Types";
import { authService } from "../AuthService/AuthService";


export async function GetBidsByAuctionId(auctionId: number) {
    const url = `https://localhost:7063/api/Bid?auctionId=${auctionId}`;
    const bids: BidType[] = await fetch(url).then(result => result.json());
    return await bids;
}

export async function GetBidsByUserId() {
  const url = `https://localhost:7063/bids/user`;
  const token = authService.getToken();

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch bids: ${response.status}`);
  }

  return await response.json();
}


export async function GetHighestBidByAuctionId(
  auctionId: number
): Promise<BidType | null> {
  const url = `https://localhost:7063/highest?auctionId=${auctionId}`;

  const res = await fetch(url);

  if (res.status === 204) return null;
  if (!res.ok) return null;

  return (await res.json()) as BidType;
}


export async function MakeBid(
  { auctionId, amount }: MakeBidRequest
): Promise<MakeBidType> {

  const url = "https://localhost:7063/api/bid";
  const token = authService.getToken();

  if (!token) {
    throw new Error("Ej inloggad");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ auctionId, amount }),
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Kunde inte lägga bud");
  }

  return await response.json();
}

export async function DeleteBid({bidId, auctionId}: DeleteBidType) {
  const url= `https://localhost:7063/api/bid`
  const token = authService.getToken(); 

  const result = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"

    }, 
    body : JSON.stringify({bidId, auctionId})
  })

  if (result.ok)
    return true; 

  return false; 
  
}
