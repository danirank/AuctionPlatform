import type { BidType } from "../types/Types";

export async function GetBidByAuctionId(auctionId: number) {
    const url = `https://localhost:7063/api/Bid?auctionId=${auctionId}`;
    const bids: BidType[] = await fetch(url).then(result => result.json());
    return await bids;
}

export async function GetHighestBidByAuctionId(auctionId: number) {
    const url = `https://localhost:7063/highest?auctionId=${auctionId}`;
    const bids: BidType[] = await fetch(url).then(result => result.json());
    return await bids;
}
