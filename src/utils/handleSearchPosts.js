export const handleSearchPosts = (posts, search, setSearchedPosts) => {
  try {
    const filteredPosts = posts?.filter(
      (post) =>
        post?.title.toLowerCase().includes(search.toLowerCase()) ||
        post?.text.toLowerCase().includes(search.toLowerCase()) ||
        post?.createdBy.toLowerCase().includes(search.toLowerCase()) 
    );
    setSearchedPosts(filteredPosts.reverse());
  } catch (err) {
    console.error(err);
  }
};