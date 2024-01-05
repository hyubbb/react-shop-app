import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.js";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../../store/products/product.slice.js";
import styles from "./DetailPage.module.scss";
import Loader from "../../components/loader/Loader.jsx";
import { addToCart, deleteFromCart } from "../../store/cart/cart.slice.js";

const DetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useAppDispatch();

  const { product, isLoading } = useAppSelector((state) => state.productSlice);
  const { products } = useAppSelector((state) => state.cartSlice);
  const productMatching = products.some((product) => product.id === productId);
  console.log(productMatching);

  const cartHandler = () => {
    productMatching
      ? dispatch(deleteFromCart(productId))
      : dispatch(addToCart(product));
  };

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  return (
    <div className='page'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.card_wrapper}>
          <div className={styles.card_img}>
            <img src={product.image} />
          </div>
          <div className={styles.card_description}>
            <h3>{product.category}</h3>
            <h1>{product.title}</h1>
            <h4>$ {product.price}</h4>
            <p>{product.description}</p>
            <div>
              <button
                className={
                  productMatching ? styles.remove_cart : styles.add_cart
                }
                onClick={cartHandler}
              >
                {productMatching ? "장바구니 담김" : "장바구니에 담기"}
              </button>
              <Link to={"/cart"}>장바구니로 이동</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
