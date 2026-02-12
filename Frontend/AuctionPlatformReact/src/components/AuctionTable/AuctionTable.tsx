import type {  AuctionType} from "../../types/Types";
import AuctionRow from "../AuctionRow/AuctionRow";

import style from './AuctionTable.module.css'

interface Props {
    auctions: AuctionType[];
    handleStatus: (auctionId:number, isActive: boolean) => void;
}

export function AuctionTable({auctions, handleStatus}: Props) {

    const tableData = auctions.map((a) => (
         <AuctionRow handleStatus= {handleStatus} key={a.id} auction={a} /> 
    ));


     return (
  <table className={style.table}>
    <thead className={style.thead}>
      <tr>
        <th>Auction ID</th>
        <th className={style.right}>Titel</th>
        <th>Användare</th>
        <th>Status</th>
        <th>Avaktiverad Av Admin</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      {auctions.length === 0 ? (
        <tr>
          <td className={style.empty} colSpan={3}>
            Inga auctioner hittades
          </td>
        </tr>
      ) : (
        tableData
      )}
    </tbody>
  </table>
);
}

export default AuctionTable;