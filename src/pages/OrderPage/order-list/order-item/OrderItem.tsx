import { FC } from "react";
import { IOrder } from "../../../../store/order/order.type";
import styles from "./OrderItem.module.scss";
import { Link } from "react-router-dom";
import { IProduct } from "../../../../store/products/product.type";

type OrderType = {
  order: IProduct;
};

const OrderItem: FC<OrderType> = ({ order }) => {
  return (
    <li className={styles.order_item}>
      <Link to={`/product/${order.id}`}>
        <img src={order.image} alt='product card' />
      </Link>
      <div className={styles.order_description}>
        <h4>{order.category}</h4>
        <h3>{order.title}</h3>
      </div>
      <div className={styles.order_price}>
        <h4>가격 :</h4>
        <span>
          $ {order.price} x {order.quantity}
        </span>
      </div>
      <div className={styles.order_total}>
        <h4>합계 :</h4>
        <span>$ {order.total}</span>
      </div>
    </li>
  );
};

export default OrderItem;
