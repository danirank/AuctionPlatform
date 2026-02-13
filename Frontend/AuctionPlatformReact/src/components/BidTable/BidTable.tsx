import type { AuctionType, BidType } from "../../types/Types";
import BidRow from "../BidRow/BidRow";
import style from "./BidTable.module.css";

interface Props {
  bids: BidType[];
  auctions: AuctionType[];
  onDelete: (bidId: number, auctionId: number) => Promise<void>;
}

function BidTable({ bids, auctions, onDelete }: Props) {
  console.log("sample", auctions[0]);

  console.log("first bid raw", bids[0]);
console.log("bid keys", bids[0] && Object.keys(bids[0] as any));


  const tableData = bids.map(b => {
    const auction = auctions.find(a => Number(a.id) === Number(b.auctionId));
    console.log("match?", b.auctionId, auction?.id);

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
    <table className={style.table}>
      <thead>
        <tr>
          <th>Användare</th>
          <th>Bud</th>
          <th>Datum</th>
          <th></th>
          <th>Auction</th>
          <th>Tid kvar</th>
        </tr>
      </thead>

      <tbody>
        {bids.length === 0 ? (
          <tr>
            <td colSpan={4} className={style.empty}>
              Inga bud hittades
            </td>
          </tr>
        ) : (
          tableData
        )}
      </tbody>
    </table>
  );
}

export default BidTable;
