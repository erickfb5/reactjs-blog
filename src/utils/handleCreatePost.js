export const handleCreatePost = async (event, userId, postTitle, postText, createPost, navigate) => {
  try {
    event.preventDefault();
    const newPost = { userId, title: postTitle, text: postText };
    await createPost({ newPost, navigate });
  } catch (err) {
    console.error(err);
  }
};
