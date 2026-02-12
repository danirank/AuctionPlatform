// src/context/AuctionProvider.tsx (uppdatera provider för create + update med rätt DTO-typer)
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { AuctionType, CreateAuctionType, UpdateAuctionType, } from "../types/Types";


import {
  GetAllAuctions,
  GetAllAuctionsSearch,
  GetAllOpenAuctions,
  GetOpenAuctionsSearch,
  CreateAuction,
  UpdateAuction,

} from "../services/AuctionService/AuctionsService";

interface AuctionContextType {
  auctions: AuctionType[];

  searchTerm: string;
  includeClosed: boolean;

  setSearchTerm: (v: string) => void;
  setIncludeClosed: (v: boolean) => void;

  reload: () => Promise<void>;

  createAuction: (values: CreateAuctionType) => Promise<AuctionType | null>;
  updateAuction: (id: number, values: UpdateAuctionType) => Promise<AuctionType | null>;

}

const AuctionContext = createContext<AuctionContextType | null>(null);

export function AuctionProvider({ children }: { children: React.ReactNode }) {
  const [auctions, setAuctions] = useState<AuctionType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [includeClosed, setIncludeClosed] = useState(false);


  const load = useCallback(async () => {
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
}, [includeClosed, searchTerm]);


  

  const createAuction = async (values: CreateAuctionType) => {
    try {
      const created = await CreateAuction(values);
      if (!created) return null;
      await load();
      return created;
    } catch (err) {
      console.error("Failed to create auction:", err);
      return null;
    }
  };
  

  const updateAuction = async (id: number, values: UpdateAuctionType) => {
    try {
      const updated = await UpdateAuction(id, values);
      if (!updated) return null;
      await load();
      return updated;
    } catch (err) {
      console.error("Failed to update auction:", err);
      return null;
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
        reload: load,
        createAuction,
        updateAuction,
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
