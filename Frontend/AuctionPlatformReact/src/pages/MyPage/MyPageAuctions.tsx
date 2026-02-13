import { useEffect } from "react";
import AuctionList from "../../components/AuctionList/AuctionList";
import { useAuctions } from "../../context/AuctionProvider";
import { useAuth } from "../../context/AuthProvider";


function MyPageAuctions () {
const {user} = useAuth();
const { allAuctions, loadAllAuctions } = useAuctions();

useEffect(() => {
  loadAllAuctions();
}, []);

     const myAuctions = allAuctions.filter(a => {
       return a.userId === user?.userId
     })   
    return (<>
    
    <AuctionList auctions={myAuctions} />

    </>)
} 

export default MyPageAuctions;  