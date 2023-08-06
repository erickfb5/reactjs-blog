import { handleCreatePost, handleEditPost } from "./";

export const handleClickSubmit = (event, props) => {
  try {
    if (props?.action === "Create Post") {
      handleCreatePost(event, props?.userId, props?.postTitle, props?.postText, props?.createPost, props?.navigate);
    } else if (props?.action === "Edit Post") {
      handleEditPost(
        event,
        props?.postId,
        props?.userId,
        props?.editPost,
        props?.editedTitle,
        props?.editedText,
        props?.navigate
      );
    } else {
      throw new Error("Error submitting post");
    }
  } catch (err) {
    console.error(err.message);
  }
};