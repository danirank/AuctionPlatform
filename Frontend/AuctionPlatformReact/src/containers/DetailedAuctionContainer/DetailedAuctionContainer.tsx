
import {GetById} from '../../services/AuctionService/AuctionsService'
import DetailedAuctionCard from "../../components/DetailedAuctionCard/DetailedAuctionCard";

import { useEffect, useState } from "react"; 
import { useParams } from "react-router";   
import type { AuctionType } from '../../types/Types';
import BidContainer from '../BidContainer/BidContainer';


function DetailedAuctionContainer () {

    const {id} = useParams();
    const [auction,setAuction] = useState<AuctionType | null>(null);
    
    useEffect (()=> {
        if (!id)
            return; 
        
        GetById(Number(id)).then(setAuction)
    },[id])
    
    if(!auction) return <p>Laddar...</p>
    
    
    return (
        <div>
        <DetailedAuctionCard auction={auction} />
        <BidContainer auctionId={auction.id}/>
    </div>
)
}

export default DetailedAuctionContainer;