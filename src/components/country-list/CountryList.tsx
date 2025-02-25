import styles from "./CountryList.module.css";
import { CityType, CountryType } from "../../types/citiesType";
import Spinner from "../spinner/Spinner";
import CountryItem from "../country-item/CountryItem";
import Message from "../message/Message";

interface CountryListProps {
  cities: CityType[] | null;
  isLoading: boolean;
}

export default function CountryList({ cities, isLoading }: CountryListProps) {
  if (isLoading) return <Spinner />;
  if (!cities?.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries: CountryType[] = cities.reduce((arr: any, city: any) => {
    if (!arr.map((el: any) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
