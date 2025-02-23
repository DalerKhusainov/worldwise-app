import { Routes, Route } from "react-router";

import HomePage from "./pages/home-page/HomePage";
import Product from "./pages/product/Product";
import Pricing from "./pages/pricing/Pricing";
import PageNotFound from "./pages/page-not-found/PageNotFound";
import AppLayout from "./pages/app-layout/AppLayout";
import Login from "./pages/login/Login";
import CityList from "./components/city-list/CityList";
import CountryList from "./components/country-list/CountryList";
import Form from "./components/form/Form";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<CityList />} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
