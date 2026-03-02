
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

  const userBids:BidType = await response.json(); 

  return userBids;
}


export async function GetHighestBidByAuctionId(
  auctionId: number
): Promise<BidType | null> {
  const url = `https://localhost:7063/highest?auctionId=${auctionId}`;

  const res = await fetch(url);

  if (res.status === 204) return null;
  if (!res.ok) return null;

  const bid: BidType = await res.json(); 

  return bid;
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

  const bid : MakeBidType = await response.json();

  return bid;
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
