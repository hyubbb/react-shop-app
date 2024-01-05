import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import CartEmpty from "../../../components/cart-empty/CartEmpty";
import { fetchOrder } from "../../../store/order/order.slice";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./OrdersList.module.scss";
import OrderItem from "./order-item/OrderItem";

const OrdersList = () => {
  const { id } = useAuth();
  const { order } = useAppSelector((state) => state.orderSlice);
  console.log(order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch, id]);

  if (!order.length) {
    return <CartEmpty />;
  }

  return (
    <div className={styles.orders}>
      {order.map((item) => (
        <div key={item.id}>
          <div className={styles.order_header}>
            <h3>주문번호: {item.id}</h3>
            <p>합계: $ {item.totalPrice.toFixed(2)}</p>
          </div>
          <ul className={styles.orders_list}>
            {item.products.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
