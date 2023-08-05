import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers.ts/appReducer";

const store = configureStore({
  // middleware: [...middlewares],
  // enhancers: [applyMiddleware(...middlewares)],
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
