import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { handleCleanSearch, handleSearchPosts, handleSearchUsers } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const { posts, search } = useStoreState(state => state.posts)
  const { users } = useStoreState(state => state.users)
  const { setSearch, setSearchedPosts }  = useStoreActions(actions => actions.posts)
  const { setSearchedUsers } = useStoreActions(actions => actions.users)
  const { pathname } = window.location
  
  const homePage = pathname === "/";
  const usersPage = pathname === "/users";

  useEffect(() => { 
    handleSearchPosts(posts, search, setSearchedPosts)
    handleSearchUsers(users, search, setSearchedUsers)
  }, [posts, users, search, setSearchedPosts, setSearchedUsers]);

  return (
    <nav className="Nav">
      <form className="searchForm" onSubmit={(event) => event.preventDefault()}>
      {homePage | usersPage ?
       <span className="input-wrapper">
         <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          placeholder={homePage? "Search" : "Search Users"}
          autoComplete="off"
          maxLength={50}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {!search && <FontAwesomeIcon icon={faSearch} fontSize="1.25rem" color="#d9b310"/>}
        <p className="clear-search">
        {search && <FontAwesomeIcon tabIndex={0} icon={faTimes} onClick={() => handleCleanSearch(setSearch)}/>}
        </p>
      
        </span> : null}
      </form>
      <ul>
        <Link to={'/'} onClick={() => handleCleanSearch(setSearch)}><li>Home</li></Link>
        <Link to={'/post'}><li>Post</li></Link>
        {/* <Link to={'/post'}><li>Liked Posts</li></Link> */}
        <Link to={'/users'} onClick={() => handleCleanSearch(setSearch)}><li>Users</li></Link>
        <Link to={'/about'}><li>About</li></Link>
      </ul>
    </nav>
  );
};

export default Nav;