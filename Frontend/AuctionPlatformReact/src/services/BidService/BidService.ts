import type { BidType, MakeBidRequest, MakeBidType } from "../../types/Types";
import { authService } from "../AuthService/AuthService";


export async function GetBidsByAuctionId(auctionId: number) {
    const url = `https://localhost:7063/api/Bid?auctionId=${auctionId}`;
    const bids: BidType[] = await fetch(url).then(result => result.json());
    return await bids;
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

