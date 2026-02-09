import styles from "./Searchbar.module.css";

interface Props {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  includeClosed: boolean;
  onIncludeClosedChange: (value: boolean) => void;
}

function Searchbar({ searchTerm, onSearch, includeClosed, onIncludeClosedChange }: Props) {
  const checkboxId = "includeClosed";

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          type="text"
          placeholder="Sök..."
          className={styles.input}
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        <span className={styles.icon}>🔍</span>
      </div>

      <div className={styles.checkbox}>
        <input
          type="checkbox"
          id={checkboxId}
          checked={includeClosed}
          onChange={(e) => onIncludeClosedChange(e.target.checked)}
        />
        <label htmlFor={checkboxId}>Inkludera avslutade auktioner</label>
      </div>
    </div>
  );
}

export default Searchbar;
