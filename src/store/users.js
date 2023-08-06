import { action, computed } from "easy-peasy";

export const usersModel = {
  userId: null,
  setUserId: action((state, payload) => { state.userId = payload }),
  users: [],
  setUsers: action((state, payload) => { state.users = payload }),
  searchedUsers: [],
  setSearchedUsers: action((state, payload) => { state.searchedUsers = payload }),
  userCount: computed((state) => state.searchedUsers.length),
};