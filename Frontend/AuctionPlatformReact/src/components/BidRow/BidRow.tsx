import type { AuctionType, BidType } from "../../types/Types";
import { FormatDate, getTimeLeft } from "../../helpers/timeHelpers";
import { useNavigate } from "react-router";
import style from "../BidTable/BidTable.module.css";
import { useAuth } from "../../context/AuthProvider";

interface Props {
  bid: BidType;
  auction?: AuctionType;
  onDelete: (bidId: number, auctionId: number) => Promise<void>;
}

function BidRow({ bid, auction, onDelete }: Props) {
  

  const navigate = useNavigate();
  const { user } = useAuth();

  const hasAuction = !!auction;

  const canDelete =
    !!auction &&
    bid.bidId === auction.highestBid?.bidId &&
    bid.userId === auction.highestBid?.userId &&
    bid.userId === user?.userId &&
    auction.isOpen;

  const timeText = !auction
    ? "—"
    : auction.isOpen
    ? getTimeLeft(auction.endDateUtc)
    : "Avslutad";

  const goToAuction = () => {
    if (!auction) return;
    navigate(`/auction/${auction.id}`);
  };

  return (
    <tr className={style.row}>
      <td data-label="Användare">{bid.userName}</td>

      <td data-label="Bud">{bid.bidAmount} kr</td>

      <td data-label="Datum">{FormatDate(bid.bidDateTime)}</td>

      <td data-label="Åtgärd" className={style.actionsCell}>
        {canDelete ? (
          <button
            className={style.dangerBtn}
            onClick={() => onDelete(bid.bidId, bid.auctionId)}
          >
            Ångra bud
          </button>
        ) : (
          <span className={style.muted}>—</span>
        )}
      </td>

      <td data-label="Auktion">
        {hasAuction ? (
          <button className={style.linkBtn} onClick={goToAuction} type="button">
            {auction.title}
          </button>
        ) : (
          <span className={style.muted}>Laddar auktion…</span>
        )}
      </td>

      <td data-label="Tid kvar">
        <span className={auction?.isOpen ? style.timeOpen : style.timeClosed}>
          {timeText}
        </span>
      </td>
    </tr>
  );
}

export default BidRow;
