

import AdminAuctionContainer from "../../containers/AdminAuctionContainer/AdminAuctionContainer";
import { checkAdmin } from "../../helpers/adminHelper";

function MyPageAdminAuctions() {
    
    checkAdmin();

  return (
    <AdminAuctionContainer />
  );
}

export default MyPageAdminAuctions;

