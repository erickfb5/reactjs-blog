import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import { useAxiosFetch } from "../hooks";

const Users = () => {
  const { searchedUsers } = useStoreState((state) => state.users);
  const { setUsers } = useStoreActions((actions) => actions.users);
  const { data: users, fetchError, isLoading  } = useAxiosFetch("https://react-blog-api-rzk5.onrender.com/users");

  useEffect(() => {
    setUsers(users);
  }, [setUsers, users]);

  return (
    <main className="About">
      { isLoading && <p className="statusMsg">Loading users...</p> }
      { !isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p> }
      { !isLoading && !fetchError && 
      <> 
        <h2>Users List</h2>
          <ul className="users-list">
          { searchedUsers?.length 
          ? searchedUsers?.map((user) => <li className="user-item" key={user._id}>@{user.username}</li>)
          : <p className="statusMsg"  style={{ marginTop: "2rem" }}>No users to display.</p> }
          </ul>
      </> }
    </main>
  );
};

export default Users;