import { useSelector } from "react-redux";

export const useAuthToken = () => {
  const token = useSelector((state) => state.auth.token);
  console.log("current user token is", token);
  return token;
};
