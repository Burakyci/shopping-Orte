import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Page404Found from "../pages/Page404Found";
import MyBasket from "../pages/MyBasket";
import Checkout from "../pages/Checkout";
import { routes } from "../constants/routes";
import SucsessScreen from "../pages/SucsessPage";

const MAINROUTE: React.FC = () => {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<Home />} />
        <Route path={routes.myBasket} element={<MyBasket />} />
        <Route path={routes.checkout} element={<Checkout />} />
        <Route path={routes.sucsess} element={<SucsessScreen />} />
        <Route path="*" element={<Page404Found />} />
      </Route>
    </Routes>
  );
};

export default MAINROUTE;
