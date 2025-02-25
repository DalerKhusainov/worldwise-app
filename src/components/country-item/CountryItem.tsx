import styles from "./CountryItem.module.css";
import { CountryType } from "../../types/citiesType";

interface CountryItemProps {
  country: CountryType;
}

export default function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <h3>{country.country}</h3>
    </li>
  );
}
