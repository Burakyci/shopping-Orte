import React from "react";
import Warning from "../assets/img/warning.png";
import { useNavigate } from "react-router-dom";
import { routes } from "../constants/routes";

const Page404Found = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img width={"25%"} src={Warning} alt="" />
      <button
        onClick={() => {
          navigate(routes.home);
        }}
        className="btn-basketAdd"
      >
        {" "}
        Ana Sayfaya Git
      </button>
    </div>
  );
};

export default Page404Found;
