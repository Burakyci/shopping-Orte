import React from "react";
import { Route, Routes } from "react-router-dom";
import Page404Found from "../pages/Page404Found";
import Landing from "../components/Landing";

const LOADINGROUTE: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<Page404Found />} />
    </Routes>
  );
};

export default LOADINGROUTE;
