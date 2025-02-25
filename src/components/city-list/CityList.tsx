import styles from "./CityList.module.css";
import { CityType } from "../../types/citiesType";
import Spinner from "../spinner/Spinner";
import CityItem from "../city-item/CityItem";
import Message from "../message/Message";
interface CityListProps {
  cities: CityType[] | null;
  isLoading: boolean;
}

export default function CityList({ cities, isLoading }: CityListProps) {
  if (isLoading) return <Spinner />;
  if (!cities?.length)
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
