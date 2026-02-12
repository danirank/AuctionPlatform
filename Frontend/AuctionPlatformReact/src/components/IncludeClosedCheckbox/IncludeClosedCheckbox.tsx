import { useAuctions } from "../../context/AuctionProvider";
import './IncludeClosedCheckbox.module.css'

interface Props {
  text: string;
}

function IncludeClosedCheckbox({ text }: Props) {
  const { includeClosed, setIncludeClosed } = useAuctions();

  return (
    <label>
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
