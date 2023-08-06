export const handleUnlikePost = async (postId, userId, unlikePost) => {
  try {
    await unlikePost({postId, userId});
  } catch (err) {
    console.error("Failed to unlike post:", err);
  }
};
