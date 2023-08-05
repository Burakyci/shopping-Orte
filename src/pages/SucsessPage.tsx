import * as React from "react";
import { routes } from "../constants/routes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/store";
import { resetMyBasketstate } from "../state/reducers.ts/appReducer";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(resetMyBasketstate());
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        marginTop: "50px",
      }}
    >
      <h2 style={{ color: "green", fontWeight: "bold" }}>Ödeme Başarılı!</h2>
      <button
        className="btn-basketAdd"
        onClick={() => {
          navigate(routes.home);
        }}
      >
        Ana Sayfaya Git
      </button>
    </div>
  );
};

export default SuccessPage;
