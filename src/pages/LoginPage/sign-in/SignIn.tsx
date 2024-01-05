import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { useNavigate } from "react-router-dom";
import app from "../../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/user/user.slice";
import { setUserId } from "../../../store/cart/cart.slice";
const SignIn = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");
  const auth = getAuth(app);

  const dispatch = useDispatch();

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
            token: userCredential.user.refreshToken,
          })
        );
        dispatch(setUserId(userCredential.user.uid));
        navigate("/");
      })
      .catch((error) => {
        return (
          error &&
          setFirebaseError(
            "이메일 또는 비밀번호가 잘못 되었습니다.",
            error.message
          )
        );
      });
  };
  return (
    <Form
      title={"로그인"}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    />
  );
};

export default SignIn;
