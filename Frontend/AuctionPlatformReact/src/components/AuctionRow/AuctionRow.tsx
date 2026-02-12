import type {  AuctionType } from "../../types/Types";


interface Props {
    auction: AuctionType
    handleStatus: (auctionId: number, isDeactivatedByAdmin:boolean) => void
}

function AuctionRow ({auction, handleStatus}: Props) {
   
  const status = auction.isOpen ? "Öppen" : "Avslutad";


    const text = auction.isDeactivatedByAdmin ?   "Ja, inaktiverad" : "Nej"

    
    return (
        <tr>
            <td>{auction.id}</td>
            <td>{auction.title}</td>
            <td>{auction.userName}</td>
            <td>{status}</td>
            <td>{text}</td>
            <td>
                <button 
                onClick={() => handleStatus(auction.id, !auction.isDeactivatedByAdmin) } 
                disabled= {auction.isDeactivatedByAdmin}>Inaktivera auction</button>
                <button  
                onClick={() => handleStatus(auction.id, !auction.isDeactivatedByAdmin)} 
                disabled = {!auction.isDeactivatedByAdmin}>
                    Aktivera auktion</button>
            </td>
        </tr>
    )


}

export default AuctionRow;