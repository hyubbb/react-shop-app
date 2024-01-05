import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.js";
import styles from "./CardList.module.scss";
import { fetchProducts } from "../../../store/products/products.slice.js";
import CardItem from "./card-item/CardItem.jsx";
import CardSkeleton from "../card-skeleton/CardSkeleton.js";

const CardList = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categoriesSlice);
  const { products, isLoading } = useAppSelector(
    (state) => state.productsSlice
  );
  useEffect(() => {
    dispatch(fetchProducts(category?.toLowerCase()));
  }, [dispatch, category]);

  if (isLoading) return <CardSkeleton />;

  return (
    <>
      <ul className={styles.card_list}>
        {products.map((product) => (
          <CardItem key={product.id} item={product} />
        ))}
      </ul>
    </>
  );
};

export default CardList;
