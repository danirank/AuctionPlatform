import { useAuctions } from "../../context/AuctionProvider";

interface Props {
  text: string;
}

function IncludeClosedCheckbox({ text }: Props) {
  const { includeClosed, setIncludeClosed } = useAuctions();

  return (
    <label style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
      <input
        type="checkbox"
        checked={includeClosed}
        onChange={(e) => setIncludeClosed(e.target.checked)}
      />
      {text}
    </label>
  );
}

export default IncludeClosedCheckbox;
