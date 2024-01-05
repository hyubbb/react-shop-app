import React from "react";
import { useAppSelector } from "../../../hooks/redux.js";
import Styles from "./CountProducts.module.scss";
const CountProducts = () => {
  const { products, isLoading } = useAppSelector(
    (state) => state.productsSlice
  );

  return (
    <div className={Styles.count_products}>
      {!isLoading && <p>total : {products.length} items</p>}
    </div>
  );
};

export default CountProducts;
