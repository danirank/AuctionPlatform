import style from './AuctionList.module.css'
import type { AuctionType } from '../../types/Types'
import AuctionCard from '../AuctionCard/AuctionCard'

interface Props {
    auctions: AuctionType[]
    
    
}

function AuctionList({auctions}: Props) {

    const list = auctions.map((auction) => {
        return <AuctionCard key={auction.id} auction={auction}/>
    });

    return (
        <div className={style.list}>
            {list}
        </div>
    )
    
}

export default AuctionList;