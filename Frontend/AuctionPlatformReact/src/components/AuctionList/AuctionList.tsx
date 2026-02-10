import style from './AuctionList.module.css'
import type { AuctionType } from '../../types/Types'
import AuctionCard from '../AuctionCard/AuctionCard'
import ClosedAuctionCard from '../ClosedAuctionCard/ClosedAuctionCard'
  


interface Props {
    auctions: AuctionType[],
    userId: string
}

function AuctionList({auctions, userId}: Props) {

    const list = auctions.map((auction) => {
        return auction.isOpen && !auction.isDeactivatedByAdmin 
        ? <AuctionCard key={auction.id} auction={auction} userId={userId}/> 
        : <ClosedAuctionCard key={auction.id} auction={auction}/>;
    });

    console.log("form list:", userId);

    return (
        
        <div className={style.list}>
            {list}
        </div>
    )
    
}

export default AuctionList;