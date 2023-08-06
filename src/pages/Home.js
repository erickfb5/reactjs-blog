import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import jwt_decode from "jwt-decode";

import { useAuth, useAxiosFetch} from "../hooks";
import { Post } from "../components";

const Home = () => {
  const { auth: { accessToken } } = useAuth();
  const { searchedPosts } = useStoreState((state) => state.posts);
  const { setPosts, setLikedPostsIds } = useStoreActions((actions) => actions.posts);
  
  const decoded = accessToken && jwt_decode(accessToken);
  const userId = decoded?.UserInfo && decoded.UserInfo.userId;

  const { data: posts, fetchError, isLoading } = useAxiosFetch( "https://react-blog-api-rzk5.onrender.com/posts");
  const { data: likedPostsIds } = useAxiosFetch( `https://react-blog-api-rzk5.onrender.com/posts/likedPosts/ids/${userId}`);

  useEffect(() => {
    setPosts(posts);
    setLikedPostsIds(likedPostsIds)
    
  }, [setPosts, posts, setLikedPostsIds, likedPostsIds]);

  return (
    <main className="Home">
      {isLoading ? (
        <p className="statusMsg">Loading posts...</p>
      ) : !isLoading && fetchError ? (
        <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>
      ) : !isLoading && searchedPosts?.length ? (
        searchedPosts.map((post) => <Post key={post._id} post={post} />)
      ) : <h1 className="statusMsg" style={{ marginTop: "2rem" }}>No posts to display.</h1>}
    
    </main>
  );
};

export default Home;