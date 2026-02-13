import { useState } from "react";
import style from "./AuctionCard.module.css";
import type { AuctionType } from "../../types/Types";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useAuth } from "../../context/AuthProvider";
import { getTimeLeft } from "../../helpers/timeHelpers";
import { useNavigate } from "react-router";
import AddBid from "../AddBid/AddBid";

interface Props {
  auction: AuctionType;
 
}

function AuctionCard({ auction}: Props) {
  const { isLoggedIn,user } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const goToAuction = () => navigate(`/auction/${auction.id}`);
  const toggleVisible = () => setIsVisible(v => !v);
  
  

  const highestBid = auction.highestBid
    ? auction.highestBid
    : { bidAmount: 0, userName: "Inga bud än", bidTime: new Date() };

  const hasAnyBids =
    highestBid.bidAmount > 0
      ? <p>Högsta: {highestBid.bidAmount} kr av {highestBid.userName}</p>
      : <p>Inga bud än</p>;

  const canBid =
    isLoggedIn && auction.isOpen && user?.userId !== auction.userId && !auction.isDeactivatedByAdmin;

  const timeLeft = getTimeLeft(auction.endDateUtc);

  return (
    <div className={style.card} onClick={goToAuction}>
      <h2>{auction.title}</h2>
      <p>Startpris: {auction.startPrice} kr</p>
      {hasAnyBids}
      <p>Slutar om: {timeLeft}</p>

      <div onClick={(e) => e.stopPropagation()}>

  {/* Admin-inaktiverad */}
  {auction.isDeactivatedByAdmin && (
    <p className={style.deactivated}>
      <strong>Auktionen har inaktiverats av administratör</strong>
    </p>
  )}

  {/* Lägg bud-knapp */}
  {canBid && !isVisible && !auction.isDeactivatedByAdmin && (
    <PrimaryButton
      buttonEvent={toggleVisible}
      buttonText="Lägg bud"
    />
  )}

  {/* AddBid-form */}
  {isVisible && (
    <AddBid
      auctionId={auction.id}
      onCancel={toggleVisible}
      onSuccess={() => setIsVisible(false)}
    />
  )}

</div>

    </div>
  );
}

export default AuctionCard;
