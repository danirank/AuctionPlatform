import { Route, Routes } from "react-router";
import MyPageNav from "../../components/MyPageNav/MyPageNav";

import MyPageAuctions from "./MyPageAuctions";

import UpdateAuctionContainer from "../../containers/UpdateAuctionContainer/UpdateAuctionContainer";
import NewAuctionContainer from "../../containers/NewAuctionContainer/NewAuctionContainer";
import MyPageAdminUsers from "./MyPageAdminUsers";
import MyPageAdminAuctions from "./MyPageAdminAuctions";
import UserBidsContainer from "../../containers/BidContainer/UserBidsContainer";



function MyPage() {
 

    return (
       <>

          <MyPageNav />
          <Routes>
            <Route path='auctions' element={<MyPageAuctions/>}/> 
            <Route path='bids' element={<UserBidsContainer/>} />
            <Route path='create' element={<NewAuctionContainer/>}/>
            <Route path='settings' />       
            <Route path="auction/:id/update" element={<UpdateAuctionContainer />} />
            <Route path='update-profile' element={<h1>Uppdatera profil</h1>} /> 
            <Route path='admin/users' element={<MyPageAdminUsers/>} /> 
            <Route path='admin/auctions' element={<MyPageAdminAuctions/>} /> 
            

          </Routes>

        
        </>
    )
}   

export default MyPage;