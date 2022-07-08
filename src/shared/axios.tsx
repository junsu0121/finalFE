import axios from "axios";

export const instance = axios.create({
  baseURL: "https://www.hel-ping.com",
  // headers: { "Content-Type": "application/json" },
  // headers: {"Content-Type": "multipart/form-data"},
});
// const token = localStorage.getItem("token");

// instance.defaults.headers.common["Authorization"] = token? `Bearer ${token}` : null; //이거
// instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
