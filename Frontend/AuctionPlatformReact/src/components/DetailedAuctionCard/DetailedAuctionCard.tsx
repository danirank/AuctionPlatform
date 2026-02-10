import style from "./DetailedAuctionCard.module.css";
import type { AuctionType } from "../../types/Types";
import { getTimeLeft } from "../../helpers/timeHelpers";



interface Props {  
    auction: AuctionType;
    
}

function DetailedAuctionCard({ auction}: Props) {

    const timeLeft = getTimeLeft(auction.endDateUtc);
    const image = auction.imageUrl ? auction.imageUrl : "../../assets/pageIcon.png";

    return (
        <div className={style.container}>
            <img src = {image} alt="Auktionsbild" className={style.image}/>
            <h2>{auction.title}</h2>
            <p>Description: {auction.description}</p>
            <p>Startpris: {auction.startPrice} kr</p>
            <p>Slutar om: {timeLeft}</p>        
        </div>
    )

}

export default DetailedAuctionCard; 