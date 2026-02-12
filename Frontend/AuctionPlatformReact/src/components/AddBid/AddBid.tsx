import { useState } from "react";
import style from "./AddBid.module.css";
import SecondaryButton from "../Buttons/SecondaryButton";
import { MakeBid } from "../../services/BidService/BidService";
import { useAuctions } from "../../context/AuctionProvider";

interface Props {
  auctionId: number;
  onCancel: () => void;
  onSuccess?: () => void; 
}

function AddBid({ auctionId, onCancel, onSuccess }: Props) {
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { reload } = useAuctions();

  const confirmBid = async () => {
    setError("");

    if (amount <= 0) {
      setError("Skriv ett bud större än 0");
      return;
    }

    setLoading(true);

    try {
      await MakeBid({ auctionId, amount }); // POST
      await reload();                      
      onSuccess?.();                       
    } catch (e: any) {
      setError(e?.message ?? "Kunde inte lägga bud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <input
        type="number"
        min={1}
        value={amount === 0 ? "" : amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Ditt bud..."
      />

      {error && <p className={style.error}>{error}</p>}

      <div className={style.buttons}>
        <SecondaryButton
          buttonText={loading ? "Skickar..." : "Bekräfta bud"}
          buttonEvent={confirmBid}
        />
        <SecondaryButton buttonText="Avbryt" buttonEvent={onCancel} />
      </div>
    </div>
  );
}

export default AddBid;
