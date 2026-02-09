

export interface AuctionType {
    id: number,
    title: string,
    userName:string,
    description: string 
    startPrice: number,
    highestBid: BidType | null
    imageUrl: string,   
    isOpen: boolean,
    startDateUtc: string,
    endDateUtc: string, 
    isDeactivatedByAdmin: boolean
}

export interface BidType {
    bidAmount: number,
    userName: string,
    bidTime: string
}

export interface RegisterUserType {
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string 
    isAdmin: boolean
}

export interface LoginUserType {
    userName: string,
    password: string
}