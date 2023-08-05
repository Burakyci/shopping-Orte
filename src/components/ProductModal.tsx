import * as React from "react";
import { IProduct } from "../types/productType";

interface IProductModalProps extends IProduct {
  onClose: () => void;
}

const ProductModal: React.FC<IProductModalProps> = ({
  description,
  img,
  price,
  size,
  stock,
  onClose,
}) => {
  const [loading, setLoading] = React.useState(true);

  //for simulating loading time
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [description, img, size, stock]);
  const imgPath = require(`../assets${img}`);

  return (
    <div id="lb-wrapper" onClick={onClose} role={"dialog"}>
      <div
        className="lb-loader"
        style={{ display: loading ? "block" : "none" }}
      ></div>

      <img
        className="img-modal"
        style={{ width: "30%", height: "50%" }}
        src={imgPath}
        alt={size}
      />
    </div>
  );
};

export default ProductModal;
