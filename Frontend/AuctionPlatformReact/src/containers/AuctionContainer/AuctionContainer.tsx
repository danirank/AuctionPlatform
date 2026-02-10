import Searchbar from "../../components/Searchbar/Searchbar";
import IncludeClosedCheckbox from "../../components/IncludeClosedCheckbox/IncludeClosedCheckbox";
import AuctionList from "../../components/AuctionList/AuctionList";
import { useAuctions } from "../../context/AuctionProvider";




function AuctionContainer() {
  const { auctions } = useAuctions();
  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <Searchbar />
        <IncludeClosedCheckbox text="Inkludera avslutade" />
      </div>

      <AuctionList auctions={auctions} />
    </div>
  );
}

export default AuctionContainer;
