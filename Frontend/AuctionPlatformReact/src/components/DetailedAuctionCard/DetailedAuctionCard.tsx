import style from "./DetailedAuctionCard.module.css";
import type { AuctionType } from "../../types/Types";
import { getTimeLeft } from "../../helpers/timeHelpers";
import placeholder from '../../assets/pageIcon.png'
import { useAuth } from "../../context/AuthProvider";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useNavigate } from "react-router";





interface Props {  
    auction: AuctionType;
    
}

function DetailedAuctionCard({ auction}: Props) {
    const {user } = useAuth(); 
    
    const navigate = useNavigate();
    
    const isOwner = user?.userId == auction.userId; 

  const goToUpdateAuction = () => navigate(`/mypage/auction/${auction.id}/update`);





    const timeLeft = getTimeLeft(auction.endDateUtc);
    const imageUrl = auction.imageUrl ? auction.imageUrl : placeholder
    const img= <img src= {imageUrl} className={style.image}/>

    return (
        <div className={style.card}>
            {img}
            <h2>{auction.title}</h2>
           <p>
  <strong>Beskrivning</strong><br />
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

{isOwner ? <PrimaryButton buttonEvent={goToUpdateAuction} buttonText="Uppdatera auktion" /> : ""}

        </div>
    )

}

export default DetailedAuctionCard; 