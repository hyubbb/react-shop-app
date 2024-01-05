import React from "react";
import { useAppSelector } from "../../../../../hooks/redux.js";
import NavCartItem from "./nav-cart-item/NavCartItem.jsx";
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
