import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import styles from "./CardList.module.scss";
import { fetchProducts } from "../../../store/products/products.slice";
import { useDispatch } from "react-redux";
import CardItem from "./card-item/CardItem";
import CardSkeleton from "../card-skeleton/CardSkeleton";

const CardList = ({ item }) => {
  const dispatch = useDispatch();
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
