import { useAppSelector } from "../../../../../hooks/redux";
import NavCartItem from "./nav-cart-item/NavCartItem";
import styles from "./NavCartList.module.scss";

const NavCartList = () => {
  const { products } = useAppSelector((state) => state.cartSlice);
  return (
    <div className={styles.new_cart_list}>
      {products.map((item) => (
        <NavCartItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default NavCartList;
