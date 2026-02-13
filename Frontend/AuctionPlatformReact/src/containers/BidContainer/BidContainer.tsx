import BidTable from "../../components/BidTable/BidTable";
import { useState, useEffect } from "react";
import { DeleteBid, GetBidsByAuctionId } from "../../services/BidService/BidService";
import type { BidType } from "../../types/Types";
import { useAuctions } from "../../context/AuctionProvider";

interface BidContainerProps {
  auctionId: number;
}

function BidContainer({ auctionId }: BidContainerProps) {
  const [bids, setBids] = useState<BidType[]>([]);
  const { allAuctions, loadAllAuctions } = useAuctions();

  // ✅ Ladda alla auktioner (så highestBid finns även för stängda)
  useEffect(() => {
    loadAllAuctions();
  }, [loadAllAuctions]);

  // ✅ Ladda bids för aktuell auktion
  useEffect(() => {
    const loadBids = async () => {
      try {
        const data = await GetBidsByAuctionId(auctionId);
        setBids(data ?? []);
      } catch (err) {
        console.error("Failed to load bids:", err);
        setBids([]);
      }
    };

    loadBids();
  }, [auctionId]);

  const handleDelete = async (bidId: number, auctionId: number) => {
    const deleted = await DeleteBid({ bidId, auctionId });
    if (!deleted) return;

    setBids(prev => prev.filter(b => b.bidId !== bidId));
  };

  return <BidTable bids={bids} auctions={allAuctions} onDelete={handleDelete} />;
}

export default BidContainer;
