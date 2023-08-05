export interface IProduct {
  id?: string;
  price: string;
  stock: string;
  img: string;
  size: "XL" | "L" | "XXL" | "S" | "XS" | "M";
  description: string;
}

export interface IProducts {
  products: {
    [key: string]: IProduct;
  }[];
}
