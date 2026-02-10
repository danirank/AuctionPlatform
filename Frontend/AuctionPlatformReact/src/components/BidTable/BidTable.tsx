import style from "./BidTable.module.css";
import type { BidType } from "../../types/Types";
import BidRow from "../BidRow/BidRow";

interface Props {
  bids: BidType[];
}

function BidTable({ bids }: Props) {
  const list = bids.map((b) => (
    <BidRow key={b.bidId} bid={b} />
  ));

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>Budgivare</th>
          <th>Bud</th>
          <th>Datum</th>
        </tr>
      </thead>

      <tbody>{list}</tbody>
    </table>
  );
}

export default BidTable;
