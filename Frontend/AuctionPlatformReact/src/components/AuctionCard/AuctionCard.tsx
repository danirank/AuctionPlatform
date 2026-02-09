import style from './AuctionCard.module.css'
import type { AuctionType } from '../../types/Types'
import PrimaryButton from '../Buttons/PrimaryButton';




interface Props {
    auction: AuctionType,
    userId: string
    
    
}

function AuctionCard({ auction, userId }: Props) {

    const highestBid = auction.highestBid ? auction.highestBid : {bidAmount: 0, userName: "Inga bud än", bidTime: new Date()}
    const hasAnyBids = highestBid.bidAmount > 0 ? <p>Slutpris: {highestBid.bidAmount} kr av {highestBid.userName}</p> : <p>Inga bud än</p>;

    const canBid = auction.isOpen && userId !== auction.userId && !auction.isDeactivatedByAdmin;

    const bidButton = canBid ? <PrimaryButton buttonText="Lägg bud" /> : null;

  
    console.log("form card:", userId);
    console.log("canBid:", canBid);


   

    

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
            {hasAnyBids}
            <p>Slutar om: {getDaysLeft(auction.endDateUtc)} dagar</p>
            <div>
                 {bidButton}
                 <PrimaryButton  buttonText="Se auktion" />
            </div>
        </div>
    )

}

export default AuctionCard;