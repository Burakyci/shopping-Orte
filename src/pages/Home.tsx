import * as React from "react";
import productSerice from "../services/productService";
import ProductList from "../components/ProductList";
import { IProduct } from "../types/productType";

const Home = () => {
  const [productList, setProductList] = React.useState<IProduct[] | undefined>(
    undefined
  );
  React.useEffect(() => {
    const res = productSerice.getAllProduct();
    setProductList(res.data);
  }, []);
  return <div>{productList && <ProductList products={productList} />}</div>;
};

export default Home;
