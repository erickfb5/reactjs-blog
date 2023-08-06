export const handleEditPost = async (event, postId, userId, editPost, editedTitle, editedText, navigate) => {
  try {
    event.preventDefault();
    const editedPost = { postId, userId, title: editedTitle, text: editedText };
    await editPost({ editedPost, navigate });
  } catch (err) {
    console.error(err);
  }
};
