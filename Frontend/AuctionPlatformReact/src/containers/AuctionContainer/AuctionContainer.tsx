import Searchbar from "../../components/Searchbar/Searchbar";
import AuctionList from "../../components/AuctionList/AuctionList";
import { useAuctions } from "../../context/AuctionProvider";




function AuctionContainer() {
  const { auctions } = useAuctions();
  return (
    <>
      
    <Searchbar />
      <AuctionList auctions={auctions} />
    </>
  );
}

export default AuctionContainer;
