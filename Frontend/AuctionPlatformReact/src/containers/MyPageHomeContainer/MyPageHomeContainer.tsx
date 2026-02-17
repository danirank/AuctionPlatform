import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import type { AuctionType, BidType } from "../../types/Types";
import MyPageQuickStats from "../../components/MyPageQuickStats/MyPageQuickStats";
import { useAuctions } from "../../context/AuctionProvider";
import { useAuth } from "../../context/AuthProvider";
import { GetBidsByUserId } from "../../services/BidService/BidService"; 

export default function MyPageQuickStatsContainer() {
  const navigate = useNavigate();
  const { allAuctions, loadAllAuctions } = useAuctions();
  const { user } = useAuth();

  const [myBids, setMyBids] = useState<BidType[]>([]);
  

  const userId = user?.userId;

  
  const myAuctions: AuctionType[] = useMemo(() => {
    if (!userId) return [];
    return allAuctions.filter((a) => a.userId === userId);
  }, [allAuctions, userId]);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      

      try {

        
        if (allAuctions.length === 0) {
          await loadAllAuctions();
        }

        const bids = await GetBidsByUserId(); 
        setMyBids(bids ?? []);
      } catch (e) {
        setMyBids([]);
      } finally {
        
      }
    };

    load();
    
  }, [userId]);

  if (!userId) return null;

  return (
    <MyPageQuickStats
      myAuctions={myAuctions}
      myBids={myBids}
      endingSoonHours={24}
      onGoToAuctions={() => navigate("/mypage/auctions")}
      onGoToBids={() => navigate("/mypage/bids")}
    />
  );
}
