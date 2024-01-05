import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { addToCart, deleteFromCart } from "../../../../store/cart/cart.slice";

const CardItem = ({ item }) => {
  const { products } = useAppSelector((state) => state.cartSlice);
  const productsMatching = products.some((product) => product.id === item.id);
  const dispatch = useAppDispatch();

  const cartHandler = () => {
    productsMatching
      ? dispatch(deleteFromCart(item.id))
      : dispatch(addToCart(item));
  };

  return (
    <li className={styles.card_item}>
      <Link to={`/product/${item.id}`}>
        <img
          src={item.image}
          width={"80%"}
          height={"200px"}
          alt='product card'
        />
      </Link>
      <h5>{item.title.substring(0, 15)}...</h5>
      <div>
        <button
          className={productsMatching ? styles.remove_cart : styles.add_cart}
          onClick={cartHandler}
        >
          {productsMatching ? "담긴 제품" : "장바구니"}
        </button>
        <p>${item.price}</p>
      </div>
    </li>
  );
};

export default CardItem;
