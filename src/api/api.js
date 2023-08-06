import axios from "axios";

export default axios.create({
  baseURL: "https://react-blog-api-rzk5.onrender.com",
  withCredentials: true,
});
