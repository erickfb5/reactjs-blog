import { createStore, persist } from "easy-peasy";
import { authModel } from "./auth";
import { postsModel } from "./posts";
import { usersModel } from "./users";

export const createAppStore = () => {
  const isTrusted = localStorage.getItem("isTrusted") === "true";
  if (isTrusted) {
    return createStore(
      persist(
        { auth: authModel, posts: postsModel, users: usersModel },
        { allow: ["auth", "posts", "users"], storage: "localStorage" }
      )
    );
  }
  return createStore({ auth: authModel, posts: postsModel, users: usersModel });
};