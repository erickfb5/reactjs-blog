import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { useAuth } from "../hooks";
import { PostForm, SubmitButton } from "../components";
import { useEffect } from "react";

const NewPost = () => {
  const { postTitle, postText } = useStoreState((state) => state.posts);
  const { createPost, setPostTitle, setPostText } = useStoreActions((actions) => actions.posts);
  const { auth: { accessToken } } = useAuth();
  const navigate = useNavigate();

  const decoded = accessToken && jwt_decode(accessToken);
  const { userId } = decoded?.UserInfo;

  useEffect(()=> {
    setPostTitle("")
    setPostText("")
  }, [setPostTitle, setPostText])

  return (
    <main className="NewPost">
      <h1>New Post</h1>
      <PostForm title={postTitle} setTitle={setPostTitle} text={postText} setText={setPostText} />
      <SubmitButton
        userId={userId}
        postTitle={postTitle}
        postText={postText}
        createPost={createPost}
        navigate={navigate}
        action={"Create Post"}
      />
    </main>
  );
};

export default NewPost;