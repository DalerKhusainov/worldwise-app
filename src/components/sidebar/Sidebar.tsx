import { Outlet } from "react-router";

import styles from "./Sidebar.module.css";
import Logo from "../logo/Logo";
import AppNav from "../app-nav/AppNav";
import Footer from "../footer/Footer";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}
