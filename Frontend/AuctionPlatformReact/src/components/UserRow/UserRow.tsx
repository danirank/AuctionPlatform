import type { UserTableType } from "../../types/Types";
import style from "../UserTable/UserTable.module.css";

interface Props {
  user: UserTableType;
  handleStatus: (userId: string, isActive: boolean) => void;
}

function UserRow({ user, handleStatus }: Props) {
  const statusText = user.isActive ? "Aktiv" : "Inaktiverad";

  return (
    <tr className={style.row}>
      {/* ID */}
      <td data-label="Användar ID">
        {user.userId}
      </td>

      {/* Namn */}
      <td data-label="Användarnamn">
        {user.userName}
      </td>

      {/* Email */}
      <td data-label="Email">
        {user.userEmail}
      </td>

      {/* Status */}
      <td data-label="Status">
        <span
          className={
            user.isActive
              ? style.activeYes
              : style.activeNo
          }
        >
          {statusText}
        </span>
      </td>

      {/* Actions */}
      <td
        data-label="Åtgärd"
        className={style.actionsCell}
      >
        <button
          className={style.disableBtn}
          onClick={() =>
            handleStatus(user.userId, false)
          }
          disabled={!user.isActive}
        >
          Inaktivera
        </button>

        <button
          className={style.enableBtn}
          onClick={() =>
            handleStatus(user.userId, true)
          }
          disabled={user.isActive}
        >
          Aktivera
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
