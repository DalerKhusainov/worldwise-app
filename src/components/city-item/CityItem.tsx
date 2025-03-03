import { FormEvent } from "react";
import { Link } from "react-router";
import { useCities } from "../../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { CityType } from "../../types/citiesType";
import { formatDate } from "../../utils/helpers";

export default function CityItem({ city }: { city: CityType }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleClick(e: FormEvent) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity?.id === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button onClick={handleClick} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}
