import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { AuctionType, CreateAuctionType, UpdateAuctionType } from "../types/Types";

import {
  GetAllAuctions,
  GetAllAuctionsSearch,
  GetAllOpenAuctions,
  GetOpenAuctionsSearch,
  CreateAuction,
  UpdateAuction,
} from "../services/AuctionService/AuctionsService";

interface AuctionContextType {
  // UI-listan (styrd av search + includeClosed)
  auctions: AuctionType[];

  // Extra cache för "Min sida" / admin / bids etc
  allAuctions: AuctionType[];

  searchTerm: string;
  includeClosed: boolean;

  setSearchTerm: (v: string) => void;
  setIncludeClosed: (v: boolean) => void;

  reload: () => Promise<void>;
  loadAllAuctions: () => Promise<void>;

  createAuction: (values: CreateAuctionType) => Promise<AuctionType | null>;
  updateAuction: (id: number, values: UpdateAuctionType) => Promise<AuctionType | null>;
}

const AuctionContext = createContext<AuctionContextType | null>(null);

export function AuctionProvider({ children }: { children: React.ReactNode }) {
  const [auctions, setAuctions] = useState<AuctionType[]>([]);
  const [allAuctions, setAllAuctions] = useState<AuctionType[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [includeClosed, setIncludeClosed] = useState(false);

  // Behåll din nuvarande logik för "UI-listan"
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

      setAuctions(result ?? []);
    } catch (err) {
      console.error("Failed to load auctions:", err);
    }
  }, [includeClosed, searchTerm]);

  // Ny: “hämta alltid ALLA auktioner” (för Min sida)
  const loadAllAuctions = useCallback(async () => {
    try {
      const result = await GetAllAuctions();
      setAllAuctions(result ?? []);
    } catch (err) {
      console.error("Failed to load ALL auctions:", err);
    }
  }, []);

  const createAuction = async (values: CreateAuctionType) => {
    try {
      const created = await CreateAuction(values);
      if (!created) return null;

      // Uppdatera UI-listan (respekterar search/includeClosed)
      await load();

      // Om du redan har laddat allAuctions någon gång: håll den fräsch
      // (valfritt men bra)
      if (allAuctions.length > 0) {
        await loadAllAuctions();
      }

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

      if (allAuctions.length > 0) {
        await loadAllAuctions();
      }

      return updated;
    } catch (err) {
      console.error("Failed to update auction:", err);
      return null;
    }
  };

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        allAuctions,

        searchTerm,
        includeClosed,
        setSearchTerm,
        setIncludeClosed,

        reload: load,
        loadAllAuctions,

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
