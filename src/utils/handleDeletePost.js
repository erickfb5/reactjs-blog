export const handleDeletePost = (deletePost, id, navigate) => {
  try {
    deletePost(id);
    navigate("/");
  } catch (err) {
    console.error(err);
  }
};