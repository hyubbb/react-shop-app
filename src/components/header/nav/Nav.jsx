import { FiLogIn, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import styles from "./Nav.module.scss";
import { getAuth, signOut } from "firebase/auth";
import app from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { removeUser } from "../../../store/user/user.slice";
// import { removeUserId } from "../../../store/cart/cart.slice";
import { useAuth } from "../../../hooks/useAuth";
import { removeUserId } from "../../../store/cart/cart.slice";
import NavCartBlock from "./nav-cart-block/NavCartBlock";

const Nav = () => {
  const auth = getAuth(app);
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cartSlice);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        dispatch(removeUserId());
        // dispatch(removeUserId());
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <div className={styles.counter}>
            <Link to={"/cart"}>
              <FiShoppingCart title='cart' />
            </Link>
            {products.length > 0 && <b>{products.length}</b>}

            {products.length > 0 && (
              <div className={styles.nav_hover_cart}>
                <NavCartBlock />
              </div>
            )}
          </div>
        </li>
        <li>
          <div className='styles.counter'>
            <Link to={"/order"}>
              <FiUser title='order' />
            </Link>
          </div>
        </li>
        <li>
          {isAuth ? (
            <GoSignOut
              className={styles.nav_sign_out}
              onClick={handleSignOut}
              title='logout'
            />
          ) : (
            <Link to={"/login"}>
              <FiLogIn title='login' />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
