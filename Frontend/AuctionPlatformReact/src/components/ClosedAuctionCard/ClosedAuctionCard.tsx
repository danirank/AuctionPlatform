import style from "./ClosedAuctionCard.module.css";
import type { AuctionType } from "../../types/Types";
import {useNavigate} from 'react-router'

interface Props {
    auction: AuctionType,
    
}

function ClosedAuctionCard({ auction}: Props) {
const navigate = useNavigate();

    const goToAuction = () => {
        navigate(`/auction/${auction.id}`);
    }

    const highestBid = auction.highestBid ? auction.highestBid : {bidAmount: 0, userName: "Inga bud", bidTime: new Date()}

    const hasAnyBids = highestBid.bidAmount > 0 ? <p>Slutpris: {highestBid.bidAmount} kr av {highestBid.userName}</p> : <p>Inga bud lades på denna auktion</p>;

      
    return (
        <div className={style.card} onClick={goToAuction}>
            <h2>{auction.title}</h2>
            {hasAnyBids}
            <p>Avslutades: {new Date(auction.endDateUtc).toLocaleString()}</p> 
        </div>
    )

}

export default ClosedAuctionCard;