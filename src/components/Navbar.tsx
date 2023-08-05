import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";
import { routes } from "../constants/routes";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Logo from "../assets/img/logo.svg";
import Snackbar from "./Snackbar";

const Navbar = () => {
  const { myBasketstate, snackbar } = useSelector(
    (state: RootState) => state.app
  );
  const navigate = useNavigate();
  return (
    <div>
      <div className="navbar-container">
        <div className="img-container">
          <img src={Logo} alt="logo" />
        </div>
        <NavLink className="link" to={routes.home}>
          Ana Sayfa
        </NavLink>
        <NavLink className="link" to={routes.checkout}>
          Siparis Ver
        </NavLink>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NavLink
            style={{ marginRight: 20 }}
            className="link"
            to={routes.myBasket}
          >
            Sepetim
          </NavLink>
          <FaShoppingBasket
            size={42}
            onClick={() => navigate(routes.myBasket)}
            color="#923939"
          />
          <span
            style={{
              width: 40,
              height: 40,
              fontSize: 32,
              background: "white",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "4px",
            }}
          >
            {myBasketstate.length}
          </span>
        </div>
      </div>
      <Snackbar
        visible={snackbar.visible || false}
        message={snackbar.message}
        action={snackbar.action}
      />
      <Outlet />
    </div>
  );
};

export default Navbar;
