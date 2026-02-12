import AuctionList from "../../components/AuctionList/AuctionList";
import { useAuctions } from "../../context/AuctionProvider";
import { useAuth } from "../../context/AuthProvider";


function MyPageAuctions () {
const {user} = useAuth();
const {auctions} = useAuctions();
console.log(user,)
     const myAuctions = auctions.filter(a => {
       return a.userId === user?.userId
     })   
    return (<>
    
    <AuctionList auctions={myAuctions} />

    </>)
} 

export default MyPageAuctions;