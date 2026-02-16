import { Route, Routes } from "react-router";
import MyPageNav from "../../components/MyPageNav/MyPageNav";

import MyPageAuctions from "./MyPageAuctions";

import UpdateAuctionContainer from "../../containers/UpdateAuctionContainer/UpdateAuctionContainer";
import NewAuctionContainer from "../../containers/NewAuctionContainer/NewAuctionContainer";
import MyPageAdminUsers from "./MyPageAdminUsers";
import MyPageAdminAuctions from "./MyPageAdminAuctions";
import UserBidsContainer from "../../containers/BidContainer/UserBidsContainer";
import UpdatePasswordContainer from "../../containers/UpdatePasswordContainer/UpdatePasswordContainer";



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
            <Route path='admin/users' element={<MyPageAdminUsers/>} /> 
            <Route path='admin/auctions' element={<MyPageAdminAuctions/>} /> 
            <Route path= 'update-password' element = {<UpdatePasswordContainer/> } /> 
          </Routes>

        
        </>
    )
}   

export default MyPage;