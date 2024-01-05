import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../../store/products/product.slice";
import styles from "./DetailPage.module.scss";
import Loader from "../../components/loader/Loader";
import { addToCart, deleteFromCart } from "../../store/cart/cart.slice";

const Detailpage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useAppDispatch();

  const { product, isLoading } = useAppSelector((state) => state.productSlice);
  const { products } = useAppSelector((state) => state.cartSlice);
  const productMatching = products.some((product) => product.id === productId);
  console.log(productMatching);
  // const addItemToCart = () => {
  //   dispatch(addToCart(product));
  // };

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

export default Detailpage;
