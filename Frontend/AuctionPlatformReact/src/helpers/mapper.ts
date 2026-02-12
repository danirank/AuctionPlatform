import type {  AuctionType } from "../types/Types";


export function mapAuctionToTable(
  auction: AuctionType
): AuctionTableType {
  return {
    auctionId: auction.id,
    title: auction.title,
    userName: auction.userName,
    isOpen: auction.isOpen,
    isDeactivatedByAdmin: auction.isDeactivatedByAdmin,
  };
}


export interface AuctionTableType {
    auctionId: number,
    title: string,  
    userName:string, 
    isOpen: boolean, 
    isDeactivatedByAdmin: boolean

}