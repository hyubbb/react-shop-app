import { IProduct } from "../products/product.type";

export interface IOrder {
  id: string;
  userId: string;
  totalPrice: number;
  products: IProduct[];
}
