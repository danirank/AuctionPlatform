import type { AuctionType, BidType } from "../../types/Types";
import BidRow from "../BidRow/BidRow";
import style from "./BidTable.module.css";

interface Props {
  bids: BidType[];
  auctions: AuctionType[];
  onDelete: (bidId: number, auctionId: number) => Promise<void>;
}

function BidTable({ bids, auctions, onDelete }: Props) {
  const sortedBids = [...bids].sort(
  (a, b) => new Date(b.bidDateTime).getTime() - new Date(a.bidDateTime).getTime()
);

  const tableData = sortedBids.map((b) => {
    const auction = auctions.find((a) => Number(a.id) === Number(b.auctionId));

    return (
      <BidRow
        key={b.bidId}
        bid={b}
        auction={auction}
        onDelete={onDelete}
      />
    );
  });

 return (
  <div className={style.wrapper}>
    {bids.length === 0 ? (
      <div className={style.emptyCard}>
        Inga bud hittades
      </div>
    ) : (
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th>Användare</th>
            <th>Bud</th>
            <th>Datum</th>
            <th className={style.actions}>Åtgärd</th>
            <th>Auktion</th>
            <th>Tid kvar</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    )}
  </div>
);

}

export default BidTable;
