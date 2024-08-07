import axios from "axios";
import { API_BASE_URL } from "./config";

const httpService = axios.create({
  baseURL: API_BASE_URL,
});

export default httpService;
