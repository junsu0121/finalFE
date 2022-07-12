import axios from "axios";
import { getCookie } from "./cookie";

export const instance = axios.create({
  baseURL: "https://www.hel-ping.com",
  headers: { "Content-Type": "application/json" },
  // headers: { "Content-Type": "multipart/form-data" },
});
// const token = localStorage.getItem("token");
const token = getCookie("token");

// if (token) {
//   instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// } else {
//   instance.defaults.headers.common["Authorization"] = null;
// }

instance.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : null; //이거
// instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
