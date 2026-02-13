
export interface UserType {
    userId: string;
    userName: string;
    email: string;
    roles: string[];
}
export interface AuctionType {
    id: number,
    userId: string,
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

export interface CreateAuctionType {
    title: string,
    description: string
    startPrice: number,
    imageUrl: string,
    startAtUtc: string,
    endAtUtc: string, 
}

export interface BidType {
    auctionId: number
    userId:string,
    bidAmount: number,
    bidId:number,
    bidDateTime: string,
    userName: string,
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

export interface AuthContextType {
    user: UserType | null;
    isLoggedIn: boolean | null;
    refreshUser: () => void;
    logout: () => void;
}

export interface MakeBidType   {
    userId: string | null, 
    auctionId: number | null,
    bidId: number | null,
    amount: number | null,
    bidDateTime: string | null

}

export interface MakeBidRequest {
  auctionId: number;
  amount: number;
}

export interface UpdateAuctionType {
    title?: string,
    description?: string
    startPrice?: number,
    imageUrl?: string,
    newEndDateUtc?: string, 
}

export interface AuctionFormValues {
  title: string;
  description: string;
  startPrice: number;
  imageUrl: string;
  startAtUtc: string;
  endAtUtc: string;
  hasBid: boolean
}

export interface UserTableType {
    userId: string, 
    userName :string, 
    userEmail:string, 
    isActive: boolean

}

export interface SetUserStatusType {
    userId: string, 
    isActive: boolean
}

export interface SetAuctionStatusType {
    auctionId: number, 
    isDeactivatedByAdmin: boolean
}

export interface DeleteBidType {
    bidId: number, 
    auctionId: number
}