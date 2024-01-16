import React, { FC } from "react";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { addToCart, deleteFromCart } from "../../../../store/cart/cart.slice";
import { IProduct } from "../../../../store/products/product.type";
import { FiShoppingCart } from "react-icons/fi";

type cardItemType = {
  item: IProduct;
};

const CardItem: FC<cardItemType> = ({ item }) => {
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
      <div className={styles.card_image}>
        <Link to={`/product/${item.id}`}>
          <img
            src={item.image}
            width={"80%"}
            height={"200px"}
            alt='product card'
          />
        </Link>
      </div>
      {/* <h5>{item.title.substring(0, 15)}...</h5> */}
      <span className={styles.item_title}>{item.title}</span>
      <strong>
        <span className={styles.item_price}>${item.price}</span>
      </strong>
      <div className={styles.cart_button}>
        {/* <button
          className={productsMatching ? styles.remove_cart : styles.add_cart}
          onClick={cartHandler}
        >
          {productsMatching ? <FiShoppingCart /> : <FiShoppingCart />}
        </button> */}
        <div className={styles.cart_icon} onClick={cartHandler}>
          {/* <svg className={styles.svgIcon} viewBox='0 0 384 512'>
            <path d='M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z'></path>
          </svg> */}

          <svg
            className={styles.svgIcon}
            viewBox='0 0 48 48'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M22 18h4v-6h6V8h-6V2h-4v6h-6v4h6v6zm-8 18c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm20 0c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm-19.65-6.5c0-.09.02-.17.06-.24l1.8-3.26h14.9c1.5 0 2.81-.83 3.5-2.06l7.72-14.02L38.83 8h-.01l-2.21 4-5.51 10H17.07l-.26-.54L12.32 12l-1.9-4-1.89-4H2v4h4l7.2 15.17-2.71 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4H14.85c-.28 0-.5-.22-.5-.5z' />
          </svg>
        </div>
      </div>
    </li>
  );
};

export default CardItem;
