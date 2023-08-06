import { action, thunk } from "easy-peasy";
import { toast } from "react-toastify";
import api from "../api/api";

export const authModel = {
  auth: {},
  setAuth: action((state, payload) => { state.auth = payload }),
  username: "",
  setUsername: action((state, payload) => { state.username = payload }),
  isTrusted: false,
  setIsTrusted: action((state, payload) => { state.isTrusted = payload }),
  authRegister: thunk(async (actions, payload) => {
    const { navigate } = payload;
    try {
      await api.post("/auth/register", {
        username: payload.username,
        password: payload.password,
      });
      console.warn(payload)
      toast.success("Signup successful! You can now log in.");
      actions.setUsername("");
      navigate("/login");
    } catch (err) {
      actions.setUsername("");
      if (err.message === 'Network Error' || err.code === "ERR_NETWORK") {
        toast.error('Oops! It looks like the server is currently down. Please try again later.');
        console.error('Oops! It looks like the server is currently down. Please try again later.');
        console.error(err);
        }
        if (err.response) {
          toast.error(err?.response?.data?.message);
          console.error(err?.response?.data?.message);
          console.error(err.response)
        }
    }
  }),
  authLogin: thunk(async (actions, payload) => {
    const { trustDevice, navigate } = payload;
    localStorage.setItem("isTrusted", trustDevice);
    try {
      const { data } = await api.post("/auth", {
        username: payload.username,
        password: payload.password,
      });

      const { accessToken } = data;
      actions.setIsTrusted(trustDevice)
      actions.setAuth({ username: payload.username, accessToken });
      actions.setUsername("");
      navigate("/");
      toast.success(`Logged in successfully as @${payload.username}!`);
    } catch (err) {
      actions.setUsername("");
      if (err.message === 'Network Error' || err.code === "ERR_NETWORK") {
        toast.error('Oops! It looks like the server is currently down. Please try again later.');
        console.error('Oops! It looks like the server is currently down. Please try again later.');
        console.error(err);
        }

        if (err.response) {
          toast.error(err?.response?.data?.message);
          console.error(err?.response?.data?.message);
          console.error(err.response)
        }
    }
  }),
};