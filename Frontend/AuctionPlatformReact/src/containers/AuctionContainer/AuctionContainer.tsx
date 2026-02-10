import { useEffect, useState } from "react";
import AuctionList from "../../components/AuctionList/AuctionList";
import Searchbar from "../../components/Searchbar/Searchbar";
import type { AuctionType } from "../../types/Types";
import {
  GetAllAuctions,
  GetAllAuctionsSearch,
  GetAllOpenAuctions,
  GetOpenAuctionsSearch,
} from "../../services/AuctionService/AuctionsService";
import { useAuth } from "../../context/AuthProvider";

function AuctionContainer() {
  const [auctions, setAuctions] = useState<AuctionType[]>([]);
  const [includeClosed, setIncludeClosed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {user} = useAuth();
  const userId = user?.userId ?? "";

  useEffect(() => {
    const load = async () => {
      try {
        const term = searchTerm.trim();

        const result = includeClosed
          ? term === ""
            ? await GetAllAuctions()
            : await GetAllAuctionsSearch(term)
          : term === ""
          ? await GetAllOpenAuctions()
          : await GetOpenAuctionsSearch(term);

        setAuctions(result);
      } catch (err) {
        console.error("Failed to load auctions:", err);
      }
    };

    load();
  }, [includeClosed, searchTerm]);

  return (
    <>
      <Searchbar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        includeClosed={includeClosed}
        onIncludeClosedChange={setIncludeClosed}
      />

      <AuctionList auctions={auctions} userId={userId} />
    </>
  );
}

export default AuctionContainer;
