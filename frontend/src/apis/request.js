import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:5173/api/v1",
});
export default request;
