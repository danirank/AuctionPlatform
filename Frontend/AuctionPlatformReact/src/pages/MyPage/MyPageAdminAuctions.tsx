

import AdminAuctionContainer from "../../containers/AdminAuctionContainer/AdminAuctionContainer";
import { checkAdmin } from "../../helpers/adminHelper";

function MyPageAdminAuctions() {
    
    checkAdmin();

  return (
    <AdminAuctionContainer />
  );
}

export default MyPageAdminAuctions;

//kolla om användare är admin annars nagigera till forbidden 
// 
// Lista på alla användare 
// 
// Lista på alla auktioner med sökfunktion (Slimmad lista) 
// // knapp för att aktiver / inaktivera varje användare och auktion