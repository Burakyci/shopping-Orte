// ProductList.jsx
import React from "react";
import { IProduct } from "../types/productType";
import ProductListItem from "./ProductListItem";
import ProductModal from "./ProductModal";

interface ProductListProps {
  products: IProduct[]; // Prop to receive the list of products
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = React.useState<IProduct | null>(
    null
  );

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: 20 }}>Ürünler - Tişört</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {products.map((product: IProduct, i) => (
          <div className="row" key={`row-${i}`}>
            <ProductListItem
              id={product.id}
              selectedProduct={setSelectedProduct}
              price={product.price}
              stock={product.stock}
              img={product.img}
              size={product.size}
              description={product.description}
            />
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          onClose={() => setSelectedProduct(null)}
          price={selectedProduct.price}
          stock={selectedProduct.stock}
          img={selectedProduct.img}
          size={selectedProduct.size}
          description={selectedProduct.description}
        />
      )}
    </>
  );
};

export default ProductList;
