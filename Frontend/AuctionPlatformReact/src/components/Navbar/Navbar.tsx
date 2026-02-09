import styles from "./Navbar.module.css";
import PrimaryButton from "../Buttons/PrimaryButton";



function Navbar() {
  return (     
<header>
  <nav >

    <div className={styles.container}>
    
      <h4>MyAuctionPlatform</h4>
      <PrimaryButton buttonText="Logga in" />
    </div>

    

  </nav>

</header>
   
  );
}

export default Navbar;
