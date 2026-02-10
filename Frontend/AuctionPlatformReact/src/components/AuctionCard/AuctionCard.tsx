import style from './AuctionCard.module.css'
import type { AuctionType } from '../../types/Types'
import PrimaryButton from '../Buttons/PrimaryButton';
import { useAuth } from '../../context/AuthProvider';
import { getTimeLeft } from '../../helpers/timeHelpers';
import { useNavigate } from 'react-router';




interface Props {
    auction: AuctionType,
    userId: string
    
    
}

function AuctionCard({ auction, userId }: Props) {
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    const goToAuction = () => {
        navigate(`/auction/${auction.id}`);
    }

    const highestBid = auction.highestBid ? auction.highestBid : {bidAmount: 0, userName: "Inga bud än", bidTime: new Date()}
    const hasAnyBids = highestBid.bidAmount > 0 ? <p>Slutpris: {highestBid.bidAmount} kr av {highestBid.userName}</p> : <p>Inga bud än</p>;

    const canBid = isLoggedIn && auction.isOpen && userId !== auction.userId && !auction.isDeactivatedByAdmin ;

    const bidButton = canBid ? <PrimaryButton buttonText="Lägg bud" /> : null;

    
    // console.log("auction.isOpen:", auction.isOpen);
    // console.log("userId not equal:", userId !== auction.userId);
    // console.log("auction.userId:", auction.userId," userId:", userId);
    // console.log("not auction.isDeactivatedByAdmin:", !auction.isDeactivatedByAdmin);
    // console.log("form card, userId:", userId);
    // console.log("canBid:", canBid);

    const timeLeft = getTimeLeft(auction.endDateUtc);
   

 return (
    <div className={style.card} onClick={goToAuction}>
      <h2>{auction.title}</h2>
      <p>Startpris: {auction.startPrice} kr</p>
      {hasAnyBids}
      <p>Slutar om: {timeLeft}</p>

      <div
        onClick={(e) => e.stopPropagation()} 
      >
        {bidButton}
      </div>
    </div>
  );
}




export default AuctionCard;