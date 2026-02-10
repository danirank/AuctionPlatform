import type { BidType } from "../../types/Types";
import { FormatDate } from "../../helpers/timeHelpers";

interface Props {
    bid: BidType
}

function BidRow ({bid}: Props) {

    const formatDate = FormatDate(bid.bidDateTime);
    return (
        <tr>
            <td>{bid.userName}</td>
            <td>{bid.bidAmount} kr</td>
            <td>{formatDate}</td>
        </tr>
    )


}

export default BidRow;