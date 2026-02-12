import { useEffect } from "react";
import AuctionTable from "../../components/AuctionTable/AuctionTable";
import { useAuctions } from "../../context/AuctionProvider";
import { SetAuctionStatus } from "../../services/AuctionService/AuctionsService";
import IncludeClosedCheckbox from "../../components/IncludeClosedCheckbox/IncludeClosedCheckbox";

function AdminAuctionContainer() {
  const { auctions, reload } = useAuctions();

  const SetActive = async (auctionId: number, isDeactivatedByAdmin: boolean) => {
    console.log(isDeactivatedByAdmin, "från container")
    await SetAuctionStatus({ auctionId, isDeactivatedByAdmin });
    await reload(); // så tabellen uppdateras efter statusändring
  };

 useEffect(() => {
  reload();
}, [reload]); 


  return (
    <>
      <IncludeClosedCheckbox text="Visa alla" />
      <AuctionTable handleStatus={SetActive} auctions={auctions} />
    </>
  );
}

export default AdminAuctionContainer;
