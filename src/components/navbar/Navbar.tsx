import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import Logo from "../logo/Logo";

export default function Navbar() {
  return (
    <header>
      <nav className={styles.nav}>
        <Logo />
        <ul>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
