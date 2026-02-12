import type { BidType } from "../../types/Types";
import { FormatDate } from "../../helpers/timeHelpers";



interface Props {
    bid: BidType,
     onDelete: (bidId: number, auctionId: number) => Promise<void>;
}

function BidRow ({bid, onDelete}: Props) {
   
    
    

    const formatDate = FormatDate(bid.bidDateTime);
    return (
        <tr>
            <td>{bid.userName}</td>
            <td>{bid.bidAmount} kr</td>
            <td>{formatDate}</td>
            <td>
                <button
  onClick= {()=> onDelete(bid.bidId, bid.auctionId)}
>
  Ångra ditt bud
</button>

            </td>
        </tr>
    )


}

export default BidRow;