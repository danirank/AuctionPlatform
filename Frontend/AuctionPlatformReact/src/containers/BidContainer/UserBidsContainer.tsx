import BidTable from "../../components/BidTable/BidTable";
import { useState, useEffect } from "react";
import { GetBidsByUserId, DeleteBid } from "../../services/BidService/BidService";
import type { BidType } from "../../types/Types";
import { useAuth } from "../../context/AuthProvider";

function BidContainer() {
  const { user } = useAuth();
  const [bids, setBids] = useState<BidType[]>([]);

  useEffect(() => {
    const userId = user?.userId;
    if (!userId) return;

    const loadBids = async () => {
      const data = await GetBidsByUserId();
      setBids(data ?? []);
    };

    loadBids();
  }, [user]);

  const handleDelete = async (bidId: number, auctionId: number) => {
   const deleted =  await DeleteBid({ bidId, auctionId });
    if(!deleted)
    return;

    // rerender direkt:
    setBids(prev => prev.filter(b => b.bidId !== bidId));
    // (alternativt: await reload från API om du vill)
  };

  return <BidTable bids={bids} onDelete={handleDelete} />;
}

export default BidContainer;
