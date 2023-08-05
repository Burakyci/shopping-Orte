import { IProduct } from "./productType";

export interface IAppState {
  snackbar: ISnackbarState;
  myBasketstate: IProduct[];
  productList: {
    data: IProduct[];
    error: string | undefined;
  };
}

export interface ISnackbarState {
  visible?: boolean;
  message: string;
  action: "error" | "info" | "sucsess";
}
