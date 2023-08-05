import React, { useEffect } from "react";
import MAINROUTE from "./MAINROUTE";
import LOADINGROUTE from "./LOADINGROUTE";
import { useAppDispatch } from "../state/store";
import { getMyBasket } from "../state/reducers.ts/appReducer";

const AppRouter: React.FC = () => {
  const [loading, setLoadimg] = React.useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyBasket());
    setLoadimg(false);
  }, [dispatch]);

  return loading ? <LOADINGROUTE /> : <MAINROUTE />;
};

export default AppRouter;
