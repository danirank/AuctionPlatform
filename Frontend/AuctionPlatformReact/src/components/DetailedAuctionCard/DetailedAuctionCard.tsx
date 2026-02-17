import { useState } from "react";
import style from "./DetailedAuctionCard.module.css";
import type { AuctionType } from "../../types/Types";
import { getTimeLeft } from "../../helpers/timeHelpers";
import placeholder from "../../assets/pageIcon.png";
import { useAuth } from "../../context/AuthProvider";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useNavigate } from "react-router";
import AddBid from "../AddBid/AddBid";

interface Props {
  auction: AuctionType;
  onBidSucces: () => void 
}

function DetailedAuctionCard({ auction, onBidSucces }: Props) {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => setIsVisible((v) => !v);

  const isOwner = user?.userId === auction.userId;

  const canBid =
    isLoggedIn &&
    auction.isOpen &&
    !isOwner &&
    !auction.isDeactivatedByAdmin;

  const goToUpdateAuction = () =>
    navigate(`/mypage/auction/${auction.id}/update`);

  const timeLeft = getTimeLeft(auction.endDateUtc);
  const imageUrl = auction.imageUrl ? auction.imageUrl : placeholder;

  return (
    <div className={style.card}>
      <img src={imageUrl} className={style.image} alt={auction.title} />

      <h2>{auction.title}</h2>

      <p>
        <strong>Beskrivning</strong>
        <br />
        {auction.description}
      </p>

      <p>
        <strong>Startpris</strong>
        <span>{auction.startPrice} kr</span>
      </p>

      <p>
        <strong>Slutar om</strong>
        <span>{timeLeft}</span>
      </p>

     
      {auction.isDeactivatedByAdmin && (
        <p className={style.deactivated}>
          <strong>Auktionen har inaktiverats av administratör</strong>
        </p>
      )}

      
      <div onClick={(e) => e.stopPropagation()}>
        {isOwner && (
          <PrimaryButton
            buttonEvent={goToUpdateAuction}
            buttonText="Uppdatera auktion"
          />
        )}

        {canBid && !isVisible && (
          <PrimaryButton buttonEvent={toggleVisible} buttonText="Buda" />
        )}

        {isVisible && (
          <AddBid
            auctionId={auction.id}
            onCancel={toggleVisible}
            onSuccess={() => {
              setIsVisible(false); 
              onBidSucces();
            }
            }
          />
        )}
      </div>
    </div>
  );
}

export default DetailedAuctionCard;
