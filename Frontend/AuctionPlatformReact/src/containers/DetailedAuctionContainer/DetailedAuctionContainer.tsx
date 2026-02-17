
import {GetById} from '../../services/AuctionService/AuctionsService'
import DetailedAuctionCard from "../../components/DetailedAuctionCard/DetailedAuctionCard";
import Style from './DetailedAuctionContainer.module.css'
import { useEffect, useState } from "react"; 
import { useParams } from "react-router";   
import type { AuctionType } from '../../types/Types';
import BidContainer from '../BidContainer/BidContainer';
import { useAuctions } from '../../context/AuctionProvider';


function DetailedAuctionContainer () {

    const {id} = useParams();
    const [auction,setAuction] = useState<AuctionType | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const {loadAllAuctions} = useAuctions();

    const handleBidSuccess = () => {
         loadAllAuctions();
        setRefreshKey(k => k + 1);
    };

    
    useEffect (()=> {
        if (!id)
            return; 
        GetById(Number(id)).then(setAuction)
    },[id])

    
    
    if(!auction) return <p>Laddar...</p>
    
    
    return (
        <div className={Style.container}>
        <DetailedAuctionCard auction={auction} onBidSucces= {handleBidSuccess} />
        <BidContainer auctionId={auction.id} refreshKey={refreshKey}/>
    </div>
)
}

export default DetailedAuctionContainer;