import { createSlice } from "@reduxjs/toolkit";
import { IAppState, ISnackbarState } from "../../types/commonTypes";
import { IProduct } from "../../types/productType";
import { IOperationResult } from "../../models/commonModels";

const initialState: IAppState = {
  snackbar: {
    visible: false,
    message: "",
    action: "error",
  },
  myBasketstate: [],
  productList: {
    data: [],
    error: undefined,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showSnackbar: (state, action: { payload: ISnackbarState }) => {
      state.snackbar = action.payload;
      state.snackbar.visible = true;
    },
    resetSnackbar: (state) => {
      state.snackbar = initialState.snackbar;
    },
    resetMyBasketstate: (state) => {
      state.myBasketstate = [];
    },
    addMyBasket: (state, action: { payload: IProduct }) => {
      state.myBasketstate.push(action.payload);
      const serializedData = JSON.stringify(state.myBasketstate);
      localStorage.setItem("myBasketstate", serializedData);
    },
    removeMyBasket: (state, action: { payload: string }) => {
      const index = state.myBasketstate.findIndex(
        (product) => product.id === action.payload
      );
      if (index !== -1) {
        state.myBasketstate.splice(index, 1);
        const serializedData = JSON.stringify(state.myBasketstate);
        localStorage.setItem("myBasketstate", serializedData);
      }
    },
    getMyBasket: (state) => {
      const serializedData = localStorage.getItem("myBasketstate");
      if (serializedData) {
        state.myBasketstate = JSON.parse(serializedData);
      }
    },

    getAllProduct: (
      state,
      action: { payload: IOperationResult<IProduct[]> }
    ) => {
      state.productList.data = action.payload.data || [];
      state.productList.error = action.payload.error;
    },
  },
});

export const {
  resetMyBasketstate,
  showSnackbar,
  resetSnackbar,
  addMyBasket,
  removeMyBasket,
  getAllProduct,
  getMyBasket,
} = appSlice.actions;

export default appSlice.reducer;
