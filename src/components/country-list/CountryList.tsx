import { useCities } from "../../contexts/CitiesContext";
import styles from "./CountryList.module.css";
import { CountryType } from "../../types/citiesType";
import Spinner from "../spinner/Spinner";
import CountryItem from "../country-item/CountryItem";
import Message from "../message/Message";

export default function CountryList() {
  const { cities, isLoading } = useCities();

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
