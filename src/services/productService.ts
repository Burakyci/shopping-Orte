import { OperationResult } from "../models/commonModels";
import { ProductModel } from "../models/productModel";
import Data from "../product.json";
import { IProduct, IProducts } from "../types/productType";

class ProductSerice {
  getAllProduct = (): OperationResult<IProduct[]> => {
    try {
      let productList: IProduct[] = [];
      let data = Data as IProducts;

      for (let key in data.products[0]) {
        const newProduct = new ProductModel({
          ...data.products[0][key],
          id: key,
        });
        productList.push(newProduct);
      }
      return new OperationResult({
        success: true,
        data: productList,
      });
    } catch (error: any) {
      return new OperationResult({
        success: false,
        message: error.message,
      });
    }
  };
}

const productSerice = new ProductSerice();
export default productSerice;
