import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import jwt_decode from "jwt-decode";

import { useAuth, useGetPostId } from "../hooks";
import { PostForm, SubmitButton } from "../components";
import { PostNotFound } from "./";

const EditedPost = () => {
  const { auth: { accessToken } } = useAuth();
  const { getPostById, editedTitle, editedText } = useStoreState((state) => state.posts);
  const { editPost, setEditedTitle, setEditedText } = useStoreActions((actions) => actions.posts);
  const navigate = useNavigate();
  
  const postId = useGetPostId();
  const post = getPostById(postId);

  const decoded = accessToken && jwt_decode(accessToken);
  const userId = decoded?.UserInfo && decoded.UserInfo.userId;

  useEffect(() => {
    post?.userId !== userId && navigate("/");

    if (post) {
      setEditedTitle(post.title);
      setEditedText(post.text);
    }
  }, [post, userId, navigate, setEditedTitle, setEditedText]);

  return (
    <main className="NewPost">
      {post?.userId === userId ? (
        <section>
          <h1>Edited Post</h1>
          <PostForm title={editedTitle} setTitle={setEditedTitle} text={editedText} setText={setEditedText} />
          <SubmitButton
            postId={postId}
            userId={userId}
            editedTitle={editedTitle}
            setEditedTitle={setEditedTitle}
            editedText={editedText}
            setEditedText={setEditedText}
            editPost={editPost}
            navigate={navigate}
            action={"Edit Post"}
            />
        </section>
      ) : (
        <PostNotFound />
      )}
    </main>
  );
};

export default EditedPost;