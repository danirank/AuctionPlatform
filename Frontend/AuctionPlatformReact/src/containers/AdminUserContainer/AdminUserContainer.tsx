import { useEffect, useState } from "react";
import { GetUsers, SetUserStatus } from "../../services/UserService/UserServices";
import UserTable from "../../components/UserTable/UserTable";
import type { UserTableType } from "../../types/Types";

function AdminUserContainer() {
  const [users, setUsers] = useState<UserTableType[]>([]);

  const SetActive = async (userId: string, isActive: boolean) => {
    await SetUserStatus({ userId, isActive });

    // uppdatera listan efter ändring (så du ser ny status direkt)
    const data = await GetUsers();
    setUsers(data ?? []);
  };

  useEffect(() => {
    const load = async () => {
      const data = await GetUsers();
      setUsers(data ?? []);
    };

    load();
  }, []); // ✅ INTE [users]

  return <UserTable handleStatus={SetActive} users={users} />;
}

export default AdminUserContainer;
