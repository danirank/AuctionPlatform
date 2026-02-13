import type { AuctionType, BidType } from "../../types/Types";
import { FormatDate, getTimeLeft } from "../../helpers/timeHelpers";

import { useNavigate } from "react-router";

interface Props {
  bid: BidType;
  auction?: AuctionType;
  onDelete: (bidId: number, auctionId: number) => Promise<void>;
}

function BidRow({ bid, auction, onDelete }: Props) {
    const navigate = useNavigate();
     const canDelete = bid.bidId == auction?.highestBid?.bidId
        && bid.userId == auction.highestBid.userId && auction.isOpen;
  
        if (!auction) return null; // eller returnera något "Laddar..."
            const timeLeft = getTimeLeft(auction.endDateUtc);
    
        const text = auction.isOpen ? timeLeft : "Avslutad"


         const goToAuction = () => navigate(`/auction/${auction.id}`);
        

  return (
    <tr>
      <td>{bid.userName}</td>
      <td>{bid.bidAmount} kr</td>
      <td>{FormatDate(bid.bidDateTime)}</td>
      <td>
        {canDelete? (
          <button onClick={() => onDelete(bid.bidId, bid.auctionId)}>
            Ångra ditt bud
          </button>
        ): ""}
      </td>
      <td onClick = {goToAuction}>{auction?.title}</td>
      <td>{text}</td>
    </tr>
  );
}

export default BidRow;
