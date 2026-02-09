import AuctionList from "../../components/AuctionList/AuctionList";
import { useState, useEffect } from "react";
import type { AuctionType } from "../../types/Types";
import {  GetAllAuctions, GetAllAuctionsSearch, GetAllOpenAuctions, GetOpenAuctionsSearch } from "../../services/AuctionService/AuctionsService";
import type { UserType } from "../../types/Types";

import Searchbar from "../../components/Searchbar/Searchbar";
import { GetUser } from "../../services/UserServices";
import { authService } from "../../services/AuthService/AuthService";




function AuctionContainer() {
  const [auctions, setAuctions] = useState<AuctionType[]>([]);
  const [includeClosed, setIncludeClosed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const term = searchTerm.trim();
        let result: AuctionType[];
        console.log("Loading auctions with searchTerm:", term, "includeClosed:", includeClosed);
        if (includeClosed) {
          result = term === ""
            ? await GetAllAuctions()
            : await GetAllAuctionsSearch(term);
        } else {
          result = term === ""
            ? await GetAllOpenAuctions()
            : await GetOpenAuctionsSearch(term);
        }

        setAuctions(result);
      } catch (err) {
        console.error("Failed to load auctions:", err);
      }
    };

    const loadUser = async () => {

        
        setIsLoggedIn(await authService.isLoggedIn());
        
        if (isLoggedIn){
        const userId = authService.getUserId();
        if (!userId) {
          console.warn("User ID not found in auth service");
          return;
            
        }

        const user: UserType = await GetUser(userId);
        setUserId(user.userId);
        console.log("Logged in user:", user.userId, user.userName);
    }


    }
    loadUser();
    load();
  }, [includeClosed, searchTerm, isLoggedIn,userId]);

  return (
    <>
      <Searchbar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        includeClosed={includeClosed}
        onIncludeClosedChange={setIncludeClosed}
      />
      <AuctionList  auctions={auctions} userId={userId}  />
    </>
  );
}

export default AuctionContainer;