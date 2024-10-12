import axios from "axios";
import { API_BASE_URL } from "./config";
import store from "@/store";
import { logout } from "@/store/slices/authSlice";

const httpService = axios.create({
  baseURL: API_BASE_URL,
});

// Add an interceptor to handle 401 errors
httpService.interceptors.response.use(
  (response) => {
    // If the response is successful, just return it
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Dispatch the logout action when a 401 is encountered
      store.dispatch(logout());
    }
    return Promise.reject(error); // Reject the promise for other errors
  }
);

export default httpService;
