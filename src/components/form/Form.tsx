// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useState, useEffect, FormEvent } from "react";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { useCities } from "../../contexts/CitiesContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import { GeocodeType } from "../../types/geocodeType";
import { CityType } from "../../types/citiesType";
import { convertToEmoji } from "../../utils/helpers";

import Button from "../button/Button";
import BackButton from "../back-button/BackButton";
import Message from "../message/Message";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState<any>(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const [mapLat, mapLng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapLat && !mapLng) return;

    async function getCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
        );
        const data: GeocodeType | undefined = await res.json();

        if (!data?.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else ☺"
          );
        }

        setCityName(data?.city || data?.locality || "");
        setCountryName(data?.countryName || "");
        setEmoji(convertToEmoji(data?.countryCode));
      } catch (error: any) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    getCityData();
  }, [mapLat, mapLng]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!cityName && !emoji) return;

    const newCity: CityType = {
      id: crypto.randomUUID(),
      cityName,
      country: countryName,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLng },
    };

    await createCity(newCity);
    navigate("/app");
  }

  if (isLoadingGeocoding) return <Spinner />;
  if (!mapLat && !mapLng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
