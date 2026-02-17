import Searchbar from "../../components/Searchbar/Searchbar";
import AuctionList from "../../components/AuctionList/AuctionList";
import { useAuctions } from "../../context/AuctionProvider";
import { useLocation } from "react-router";
import { useEffect } from "react";


function AuctionContainer() {
  const { auctions, reload } = useAuctions();
  const location = useLocation();

  useEffect(() => {
    reload();
  }, [reload, location.key]);
 
  return (
    <>
      <Searchbar />
      <AuctionList auctions={auctions} />
    </>
  );
}

export default AuctionContainer;
