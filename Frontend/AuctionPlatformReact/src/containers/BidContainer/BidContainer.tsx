import BidTable from "../../components/BidTable/BidTable";
import { useState, useEffect } from "react";
import { GetBidsByAuctionId } from "../../services/BidService/BidService";
import type { BidType } from '../../types/Types'

interface BidContainerProps {
    auctionId: number;
}

function BidContainer({ auctionId }: BidContainerProps) {
// Här vill jag hämta bids för en specifik auktion på id. Använd 
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


    return <BidTable bids= {bids} />
}


export default BidContainer;