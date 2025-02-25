import { useSearchParams, useNavigate } from "react-router";
import styles from "./Map.module.css";

export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <p>
        Position: {lat}, {lng}
      </p>
    </div>
  );
}
