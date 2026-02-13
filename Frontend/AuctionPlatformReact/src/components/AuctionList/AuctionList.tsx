import style from './AuctionList.module.css'
import type { AuctionType } from '../../types/Types'
import AuctionCard from '../AuctionCard/AuctionCard'
import ClosedAuctionCard from '../ClosedAuctionCard/ClosedAuctionCard'

  


interface Props {
    auctions: AuctionType[],
    
}

function AuctionList({auctions}: Props) {
    

    const list = auctions.map((auction) => {

        return auction.isOpen 
        ? <AuctionCard key={auction.id} auction={auction} /> 
        : <ClosedAuctionCard key={auction.id} auction={auction}/>;
    });

    

    return (

        <div className={style.list}>
            {list}
        </div>
    )
    
}

export default AuctionList;