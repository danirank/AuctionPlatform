import { useEffect, useState } from "react";
import BidTable from "../../components/BidTable/BidTable";
import { GetBidsByUserId, DeleteBid } from "../../services/BidService/BidService";
import type { BidType } from "../../types/Types";
import { useAuth } from "../../context/AuthProvider";
import { useAuctions } from "../../context/AuctionProvider";

function UserBidContainer() {
  const { user } = useAuth();
  const [bids, setBids] = useState<BidType[]>([]);
  const { allAuctions, loadAllAuctions } = useAuctions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.userId) return;

    const loadBids = async () => {
      setLoading(true);

      const data = await GetBidsByUserId();
      console.log(data);
      setBids(data ?? []);
      setLoading(false);
    };

    loadBids();
  }, [user]);

  useEffect(() => {
    loadAllAuctions();
  }, [loadAllAuctions]);

  const handleDelete = async (bidId: number, auctionId: number) => {
    const deleted = await DeleteBid({ bidId, auctionId });

    if (!deleted) return;

    setBids(prev => prev.filter(b => b.bidId !== bidId));
  };

  if (loading) return <p>Laddar bud...</p>;

  return <BidTable auctions={allAuctions} bids={bids} onDelete={handleDelete} />;
}

export default UserBidContainer;
