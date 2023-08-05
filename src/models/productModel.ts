import { IProduct } from "../types/productType";

export class ProductModel implements IProduct {
  id?: string | undefined;
  price!: string;
  stock!: string;
  img!: string;
  size!: "XL" | "L" | "XXL" | "S" | "XS" | "M";
  description!: string;
  constructor(data: IProduct) {
    if (data) {
      Object.assign(this, { ...data, id: data?.id });
    }
  }
}
