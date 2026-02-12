import { NavLink } from "react-router";
import { useState } from "react";
import styles from "./MyPageNav.module.css";
import { useAuth } from "../../context/AuthProvider";

function MyPageNav() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const isAdmin = user?.roles?.includes("Admin") ?? false;

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/mypage/auctions"
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            Mina auktioner
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/mypage/bids"
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            Mina bud
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/mypage/create"
            className={({ isActive }) => (isActive ? styles.active : styles.link)}
          >
            Skapa auktion
          </NavLink>
        </li>

        
        <li className={styles.dropdown}>
          <button
            type="button"
            className={styles.dropdownBtn}
            onClick={() => setOpen((o) => !o)}
          >
            Inställningar ▾
          </button>

          {open && (
            <ul className={styles.submenu}>
              <li>
                <NavLink
                  to="/mypage/update-profile"
                  className={({ isActive }) => (isActive ? styles.active : styles.link)}
                  onClick={() => setOpen(false)}
                >
                  Uppdatera profil
                </NavLink>
              </li>

              
            </ul>
          )}
        </li>
        {isAdmin && (
                <li>
                  <NavLink
                    to="/mypage/admin"
                    className={({ isActive }) => (isActive ? styles.active : styles.link)}
                    onClick={() => setOpen(false)}
                  >
                    Admin Panel
                  </NavLink>
                </li>
              )}
      </ul>
    </nav>
  );
}

export default MyPageNav;
