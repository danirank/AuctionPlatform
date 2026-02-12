import styles from "./Searchbar.module.css";
import { useAuctions } from "../../context/AuctionProvider";
import IncludeClosedCheckbox from "../../components/IncludeClosedCheckbox/IncludeClosedCheckbox";


function Searchbar() {
  const { searchTerm, setSearchTerm } = useAuctions();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          type="text"
          placeholder="Sök auktion..."
          className={styles.input}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <span className={styles.icon}>🔍</span>
      </div>
      <div className={styles.checkbox}>
        <IncludeClosedCheckbox text="Inkludera avslutade" />
    </div>
    </div>

  );
}

export default Searchbar;
