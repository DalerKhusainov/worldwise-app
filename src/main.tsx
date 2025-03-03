import { BrowserRouter as Router } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CitiesProvider } from "./contexts/CitiesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <CitiesProvider>
        <App />
      </CitiesProvider>
    </Router>
  </StrictMode>
);
