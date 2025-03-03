import { useCities } from "../../contexts/CitiesContext";
import styles from "./CityList.module.css";
import Spinner from "../spinner/Spinner";
import CityItem from "../city-item/CityItem";
import Message from "../message/Message";

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (cities?.length === 0)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
