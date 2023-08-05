import React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../state/store";
import { IProduct } from "../types/productType";
import { removeMyBasket } from "../state/reducers.ts/appReducer";
import ProductListItem from "../components/ProductListItem";

const MyBasket = () => {
  const { myBasketstate } = useSelector((state: RootState) => state.app);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  const dispatch = useAppDispatch();

  const groupProductsByCount = (products: IProduct[]) => {
    const groupedProducts: { [key: string]: IProduct & { count: number } } = {};
    products.forEach((product) => {
      const existingProduct = groupedProducts[product.id as string];
      if (existingProduct) {
        existingProduct.count++;
      } else {
        groupedProducts[product.id as string] = { ...product, count: 1 };
      }
    });
    return Object.values(groupedProducts);
  };

  const groupedBasketProducts = groupProductsByCount(myBasketstate);
  React.useEffect(() => {
    let sum = 0;
    myBasketstate.forEach((product: IProduct) => {
      sum += parseFloat(product.price);
    });
    setTotalPrice(sum);
  }, [myBasketstate]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Sepetim </h1>
      {groupedBasketProducts.length === 0 ? null : (
        <h1 style={{ textAlign: "center" }}>Toplam Tutar {totalPrice} TL </h1>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        {groupedBasketProducts.length === 0 ? (
          <h3>Sepetiniz Boş</h3>
        ) : (
          <>
            {groupedBasketProducts.map(
              (product: IProduct & { count: number }, i) => (
                <div className="row" key={`row-${i}`}>
                  <ProductListItem
                    id={product.id}
                    price={product.price}
                    stock={product.stock}
                    img={product.img}
                    size={product.size}
                    description={product.description}
                    fromPage="myBasket"
                    amount={product.count}
                  />
                  <div
                    style={{
                      background: "#ffcbcb",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <button
                      className="btn-basketAdd"
                      style={{ width: "100%" }}
                      onClick={() => {
                        if (product.id) {
                          dispatch(removeMyBasket(product.id));
                        }
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyBasket;
