import styles from "./MyPageQuickStats.module.css";
import type { AuctionType, BidType } from "../../types/Types";
import StatCard from "../../components/StatCard/StatCard";

type Props = {
  myAuctions: AuctionType[];
  myBids: BidType[];
  endingSoonHours?: number;

  onGoToAuctions?: () => void;
  onGoToBids?: () => void;
};

export default function MyPageQuickStats({
  myAuctions,
  myBids,
  onGoToAuctions,
  onGoToBids,
  endingSoonHours = 24,
}: Props) {
  const now = Date.now();
  const soonMs = endingSoonHours * 60 * 60 * 1000;

  const myActiveAuctions = myAuctions.filter((a) => a.isOpen).length;
  const myClosedAuctions = myAuctions.filter((a) => !a.isOpen).length;

  const totalMyBids = myBids.length;

  const auctionsIBidOn = new Set(myBids.map((b) => Number(b.auctionId))).size;

  const myEndingSoon = myAuctions.filter((a) => {
    if (!a.isOpen) return false;
    const end = new Date(a.endDateUtc).getTime();
    return end - now > 0 && end - now <= soonMs;
  }).length;

  return (
    <section className={styles.wrapper} aria-label="Snabböversikt">
      <div className={styles.grid}>
        <StatCard
          label="Mina aktiva auktioner"
          value={myActiveAuctions}
          subText="Öppna just nu"
          onClick={onGoToAuctions}
        />

        <StatCard
          label="Mina avslutade auktioner"
          value={myClosedAuctions}
          subText="Historik"
          onClick={onGoToAuctions}
        />

        <StatCard
          label="Mina bud"
          value={totalMyBids}
          subText="Totalt lagda bud"
          tone={totalMyBids > 0 ? "warning" : "default"}
          onClick={onGoToBids}
        />

        <StatCard
          label="Auktioner jag budat på"
          value={auctionsIBidOn}
          subText="Unika auktioner"
          onClick={onGoToBids}
        />

        <StatCard
          label="Slutar snart"
          value={myEndingSoon}
          subText={`Inom ${endingSoonHours}h`}
          tone={myEndingSoon > 0 ? "danger" : "default"}
          onClick={onGoToAuctions}
        />
      </div>
    </section>
  );
}
