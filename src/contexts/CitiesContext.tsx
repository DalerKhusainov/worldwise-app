import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { CityType } from "../types/citiesType";

interface CitiesContextType {
  cities: CityType[] | null;
  isLoading: boolean;
  currentCity: CityType | null;
  getCity: (id: string | undefined) => void;
  createCity: (newCity: CityType) => void;
  deleteCity: (id: string) => void;
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<CityType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<CityType | null>(null);

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);

  async function getCity(id: string | undefined) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error: any) {
      console.error("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity: CityType) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCities((cities) => [...cities!, data]);
    } catch (error: any) {
      console.error("There was an error creating city.");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: string) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities!.filter((city) => city.id !== id));
    } catch (error: any) {
      console.error("There was an error deleting city.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities(): CitiesContextType {
  const citiesContext = useContext(CitiesContext);
  if (citiesContext === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return citiesContext;
}

export { CitiesProvider, useCities };
