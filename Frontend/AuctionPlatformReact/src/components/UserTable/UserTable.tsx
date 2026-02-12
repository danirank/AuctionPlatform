import type { UserTableType } from "../../types/Types";
import UserRow from "../UserRow/UserRow";
import style from './UserTable.module.css'

interface Props {
    users: UserTableType[];
    handleStatus: (userId:string, isactive: boolean) => void;
}

export function UserTable({users, handleStatus}: Props) {

    const tableData = users.map((u) => (
         <UserRow handleStatus= {handleStatus} key={u.userId} user={u} /> 
    ));


     return (
  <table className={style.table}>
    <thead className={style.thead}>
      <tr>
        <th>Användar ID</th>
        <th className={style.right}>Användarnamn</th>
        <th>Email</th>
        <th>Aktiv</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      {users.length === 0 ? (
        <tr>
          <td className={style.empty} colSpan={3}>
            Inga användare hittades
          </td>
        </tr>
      ) : (
        tableData
      )}
    </tbody>
  </table>
);
}

export default UserTable;