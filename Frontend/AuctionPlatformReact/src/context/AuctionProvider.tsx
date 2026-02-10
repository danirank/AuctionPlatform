import { createContext, useContext, useEffect, useState } from "react";
import type { AuctionType } from "../types/Types";

import {
  GetAllAuctions,
  GetAllAuctionsSearch,
  GetAllOpenAuctions,
  GetOpenAuctionsSearch
} from "../services/AuctionService/AuctionsService";

interface AuctionContextType {
  auctions: AuctionType[];

  searchTerm: string;
  includeClosed: boolean;

  setSearchTerm: (v: string) => void;
  setIncludeClosed: (v: boolean) => void;

  reload: () => Promise<void>;
}

const AuctionContext = createContext<AuctionContextType | null>(null);

export function AuctionProvider({ children }: { children: React.ReactNode }) {

  const [auctions, setAuctions] = useState<AuctionType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [includeClosed, setIncludeClosed] = useState(false);

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

  useEffect(() => {
    load();
  }, [includeClosed, searchTerm]);

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        searchTerm,
        includeClosed,
        setSearchTerm,
        setIncludeClosed,
        reload: load
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuctions() {
  const ctx = useContext(AuctionContext);
  if (!ctx) throw new Error("useAuctions must be used in AuctionProvider");
  return ctx;
}
