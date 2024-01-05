import { useAppSelector } from "./redux";

export const useAuth = () => {
  const { id, email, token } = useAppSelector((state) => state.userSlice);
  return {
    isAuth: !!email,
    email,
    id,
    token,
  };
};
