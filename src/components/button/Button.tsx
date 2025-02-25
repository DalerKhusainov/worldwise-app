import { ReactNode, FormEvent } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  type: "primary" | "back";
  onClick: (e: FormEvent) => void;
}

export default function Button({ children, onClick, type }: ButtonProps) {
  return (
    <div className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </div>
  );
}
