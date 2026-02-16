import type { AuctionType } from "../../types/Types";
import style from "../AuctionTable/AuctionTable.module.css";

interface Props {
  auction: AuctionType;
  handleStatus: (auctionId: number, isDeactivatedByAdmin: boolean) => void;
}

function AuctionRow({ auction, handleStatus }: Props) {
  const statusText = auction.isOpen ? "Öppen" : "Avslutad";

  const adminText = auction.isDeactivatedByAdmin
    ? "Ja, inaktiverad"
    : "Nej";

  return (
    <tr className={style.row}>
      {/* ID */}
      <td data-label="Auction ID">
        {auction.id}
      </td>

      {/* Titel */}
      <td data-label="Titel">
        {auction.title}
      </td>

      {/* Användare */}
      <td data-label="Användare">
        {auction.userName}
      </td>

      {/* Status */}
      <td data-label="Status">
        <span
          className={
            auction.isOpen
              ? style.statusOpen
              : style.statusClosed
          }
        >
          {statusText}
        </span>
      </td>

      {/* Admin-status */}
      <td data-label="Avaktiverad av admin">
        <span
          className={
            auction.isDeactivatedByAdmin
              ? style.adminYes
              : style.adminNo
          }
        >
          {adminText}
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
            handleStatus(
              auction.id,
              !auction.isDeactivatedByAdmin
            )
          }
          disabled={auction.isDeactivatedByAdmin}
        >
          Inaktivera
        </button>

        <button
          className={style.enableBtn}
          onClick={() =>
            handleStatus(
              auction.id,
              !auction.isDeactivatedByAdmin
            )
          }
          disabled={!auction.isDeactivatedByAdmin}
        >
          Aktivera
        </button>
      </td>
    </tr>
  );
}

export default AuctionRow;
