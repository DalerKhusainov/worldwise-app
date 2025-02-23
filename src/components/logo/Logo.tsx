import { Link } from "react-router";
import styles from "./Logo.module.css";
import logoImg from "../../assets/logo.png";

function Logo() {
  return (
    <Link to="/">
      <img src={logoImg} alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
