

import AdminUserContainer from "../../containers/AdminUserContainer/AdminUserContainer";
import { checkAdmin } from "../../helpers/adminHelper";

function MyPageAdminUsers() {
    
    checkAdmin();

  return (
    <AdminUserContainer />
  );
}

export default MyPageAdminUsers;

