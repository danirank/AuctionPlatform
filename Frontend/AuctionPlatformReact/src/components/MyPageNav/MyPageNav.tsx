import { NavLink } from "react-router";
import styles from "./MyPageNav.module.css";

function MyPageNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>

        <li>
          <NavLink
            to="/mypage/auctions"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Mina auktioner
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/mypage/bids"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Mina bud
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/mypage/create"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Skapa auktion
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/mypage/settings"
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            Inställningar
          </NavLink>
        </li>

      </ul>
    </nav>
  );
}

export default MyPageNav;
