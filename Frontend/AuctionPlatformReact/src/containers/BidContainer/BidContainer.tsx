import BidTable from "../../components/BidTable/BidTable";
import { useState, useEffect } from "react";
import { DeleteBid, GetBidsByAuctionId } from "../../services/BidService/BidService";
import type { BidType } from '../../types/Types'

interface BidContainerProps {
    auctionId: number;
}

function BidContainer({ auctionId }: BidContainerProps) {

const [bids, setBids] = useState<BidType[]>([]);

useEffect(() => {

    const loadBids = async () => {
        try {
            const bid = await GetBidsByAuctionId(auctionId);
            setBids(bid);
        } catch (err) {
            console.error("Failed to load bids:", err);
        }

    }

loadBids();

},[auctionId]);

const handleDelete = async (bidId: number, auctionId: number) => {
   const deleted = await DeleteBid({ bidId, auctionId });

   if(!deleted)
    return;
    // rerender direkt:
    setBids(prev => prev.filter(b => b.bidId !== bidId));
    // (alternativt: await reload från API om du vill)
  };


    return <BidTable  bids= {bids} onDelete={handleDelete} />
}


export default BidContainer;