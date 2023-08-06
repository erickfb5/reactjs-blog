export const handleLikePost = async (postId, userId, thumbsUpIcon, likePost, unlikePost, isLikedPost, setIsLikedPost, setDisabled) => {
  try {
    if (isLikedPost) {
      setDisabled("none")
      await unlikePost({ postId, userId });
    } else {
      setDisabled("none")
      await likePost({ postId, userId });
    }
    setIsLikedPost(!isLikedPost); // Toggle the state to change faThumbsUp icon color
    if (thumbsUpIcon) thumbsUpIcon.blur();
  } catch (err) {
    console.error("Error handling like/unlike:", err);
  }
  finally {
    setDisabled("")
  }
};