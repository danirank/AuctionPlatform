import styles from "./Searchbar.module.css";
import { useRef } from "react";
interface Props {
    onSearch: (searchTerm: string) => void;
}

function Searchbar({onSearch}: Props) {
const textValue = useRef<HTMLInputElement>(null);

  return (
    //Lägg till bakgrund ? 
    <div className={styles.container}>
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder="Sök..."
        className={styles.input}
        ref={textValue}
        
        onChange={() => {
          if(textValue.current) {
            onSearch(textValue.current.value);
          }
        }}
      />
      <span className={styles.icon}>🔍</span>
      </div>
    </div>
  );
}

export default Searchbar;
