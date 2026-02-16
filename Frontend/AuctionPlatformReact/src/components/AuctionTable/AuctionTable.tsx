import type { AuctionType } from "../../types/Types";
import AuctionRow from "../AuctionRow/AuctionRow";
import style from "./AuctionTable.module.css";

interface Props {
  auctions: AuctionType[];
  handleStatus: (auctionId: number, isActive: boolean) => void;
}

export function AuctionTable({ auctions, handleStatus }: Props) {
  return (
    <div className={style.wrapper}>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th>Auction ID</th>
            <th>Titel</th>
            <th>Användare</th>
            <th>Status</th>
            <th>Avaktiverad av admin</th>
            <th className={style.actions}>Åtgärd</th>
          </tr>
        </thead>

        <tbody>
          {auctions.length === 0 ? (
            <tr>
              <td className={style.empty} colSpan={6}>
                Inga auktioner hittades
              </td>
            </tr>
          ) : (
            auctions.map((a) => (
              <AuctionRow key={a.id} auction={a} handleStatus={handleStatus} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AuctionTable;
