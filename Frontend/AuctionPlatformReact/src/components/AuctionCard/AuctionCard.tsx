import style from './AuctionCard.module.css'
import type { AuctionType } from '../../types/Types'


interface Props {
    auction: AuctionType,
    
}

function AuctionCard({ auction}: Props) {

    const highestBid = auction.highestBid ? auction.highestBid : {bidAmount: 0, userName: "Inga bud än", bidTime: new Date()}

    function getDaysLeft(endDateUtc: string) {
            const now = Date.now();
            const end = new Date(endDateUtc).getTime();

                    const diffMs = end - now;

        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        return Math.max(0, days);
        }

    return (
        <div className={style.card}>
            <h2>{auction.title}</h2>
            <p>{auction.description}</p>
            <p>Startpris: {auction.startPrice} kr</p>
            <p>Högsta bud: {highestBid.bidAmount}kr av {highestBid.userName}</p>
            <p>Slutar om: {getDaysLeft(auction.endDateUtc)} dagar</p>
            <p>Är öppen: {auction.isOpen ? "Ja" : "Nej"}</p>
        </div>
    )

}

export default AuctionCard;