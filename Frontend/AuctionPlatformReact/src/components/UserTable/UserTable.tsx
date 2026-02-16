import type { UserTableType } from "../../types/Types";
import UserRow from "../UserRow/UserRow";
import style from "./UserTable.module.css";

interface Props {
  users: UserTableType[];
  handleStatus: (userId: string, isActive: boolean) => void;
}

export function UserTable({ users, handleStatus }: Props) {
  return (
    <div className={style.wrapper}>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th>Användar ID</th>
            <th>Användarnamn</th>
            <th>Email</th>
            <th>Aktiv</th>
            <th className={style.actions}>Åtgärd</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td className={style.empty} colSpan={5}>
                Inga användare hittades
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <UserRow key={u.userId} user={u} handleStatus={handleStatus} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
