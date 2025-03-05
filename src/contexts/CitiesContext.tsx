import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { CityType } from "../types/citiesType";

interface State {
  cities: CityType[] | null;
  isLoading: boolean;
  currentCity: CityType | null;
  error: string | null;
}

export type Action =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: CityType[] | null }
  | { type: "city/loaded"; payload: CityType | null }
  | { type: "city/created"; payload: CityType }
  | { type: "city/deleted"; payload: string }
  | { type: "rejected"; payload: string | null };

const initialState: State = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities!, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities!.filter((city) => city.id !== action.payload),
        currentCity: null,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        arror: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

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
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    }
    getCities();
  }, []);

  async function getCity(id: string | undefined) {
    if (id === currentCity?.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error: any) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city...",
      });
    }
  }

  async function createCity(newCity: CityType) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error: any) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city.",
      });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error: any) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city.",
      });
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
