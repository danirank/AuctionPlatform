import AuctionList from "../../components/AuctionList/AuctionList";
import { useState, useEffect } from "react";
import type { AuctionType } from "../../types/Types";
import { GetAllOpenAuctions, GetOpenAuctionsSearch } from "../../services/AuctionService/AuctionsService";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Searchbar/Searchbar";




function AuctionContainer() {

    const [auctions, setAuctions] = useState<AuctionType[]>([]);

   
    useEffect( () => {
        const loadOpenAuctions = async () => {
            setAuctions(await GetAllOpenAuctions());
        };
        loadOpenAuctions();
    }, [setAuctions]);
    
   const search = async (searchTerm: string) => {
        if(searchTerm === "") {
            setAuctions(await GetAllOpenAuctions());
        } else {
            setAuctions(await GetOpenAuctionsSearch(searchTerm));
        }
    }

    return (
        <>
        <Navbar />
        <Searchbar onSearch={search} />
        <AuctionList auctions={auctions} />
        </>
    )
  

}
export default AuctionContainer;