import * as React from "react";
import { IProduct } from "../types/productType";
import { RootState, useAppDispatch } from "../state/store";
import { addMyBasket, showSnackbar } from "../state/reducers.ts/appReducer";
import { useSelector } from "react-redux";

interface IProductListItemProps extends IProduct {
  selectedProduct?: (product: IProduct) => void;
  fromPage?: "home" | "myBasket";
  amount?: number;
}

const ProductListItem: React.FC<IProductListItemProps> = ({
  description,
  img,
  price,
  size,
  stock,
  id,
  amount,
  selectedProduct,
  fromPage = "home",
}) => {
  const dispatch = useAppDispatch();
  const imgPath = require(`../assets${img}`);
  const { myBasketstate } = useSelector((state: RootState) => state.app);
  const itemCountWithSameId = myBasketstate.filter(
    (item) => item.id === id
  ).length;

  const handleAddToBasket = () => {
    if (parseInt(stock) > itemCountWithSameId) {
      dispatch(addMyBasket({ description, img, price, size, stock, id }));
    } else {
      dispatch(
        showSnackbar({
          action: "error",
          message: "yeteri kadar stok yok",
          visible: true,
        })
      );
    }
  };

  return (
    <div className="col-wrapper">
      <div
        className="col-img-container"
        onClick={() => {
          selectedProduct &&
            selectedProduct({ description, img, price, size, stock, id });
        }}
        style={{ cursor: "pointer" }}
      >
        <img src={imgPath} className="img" alt={size} />
      </div>
      <h3>Tutar: {price}</h3>
      <h3>Size: {size}</h3>
      <h3>Stok: {stock}</h3>
      {fromPage === "home" ? (
        <button className="btn-basketAdd" onClick={handleAddToBasket}>
          <span>Sepete Ekle</span>
        </button>
      ) : (
        <div>
          <h3>ADET: {amount}</h3>
        </div>
      )}
    </div>
  );
};

export default ProductListItem;
