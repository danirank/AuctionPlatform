import type { AuctionType } from "../../types/Types";



export async function GetAllOpenAuctions() {
    const url = "https://localhost:7063/open/all"

    const auctions:AuctionType[] = await fetch(url).then(result => result.json())

    return await auctions;
}

export async function GetOpenAuctionsSearch(titleSearch :string) {
    const url = `https://localhost:7063/open/search?search=${encodeURIComponent(titleSearch)}`

    const auctions:AuctionType[] = await fetch(url).then(result => result.json())

    return await auctions;
}

export async function GetAllAuctionsSearch(titleSearch :string) {
    const url = `https://localhost:7063/all/search?search=${encodeURIComponent(titleSearch)}`

    const auctions:AuctionType[] = await fetch(url).then(result => result.json())

    return await auctions;
}


export async function GetAllAuctions() {
    const url = "https://localhost:7063/all"

    const auctions:AuctionType[] = await fetch(url).then(result => result.json())

    return await auctions;
}