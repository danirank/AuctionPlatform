import { Route, Routes } from "react-router";
import MyPageNav from "../../components/MyPageNav/MyPageNav";

import MyPageAuctions from "./MyPageAuctions";

import UpdateAuctionContainer from "../../containers/UpdateAuctionContainer/UpdateAuctionContainer";
import NewAuctionContainer from "../../containers/NewAuctionContainer/NewAuctionContainer";



function MyPage() {
 

    return (
       <>

          <MyPageNav />
          <Routes>
            <Route path='auctions' element={<MyPageAuctions/>}/> 
            <Route path='bids' />
            <Route path='create' element={<NewAuctionContainer/>}/>
            <Route path='settings' />
                      
                <Route path="auction/:id/update" element={
                    
                         <UpdateAuctionContainer />
                   
                    } />
            

          </Routes>
        
        </>
    )
}   

export default MyPage;