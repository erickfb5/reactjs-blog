import { action, computed, thunk } from "easy-peasy";
import api from "../api/api";
import { toast } from "react-toastify";

export const postsModel = {
  posts: [],
  setPosts: action((state, payload) => { state.posts = payload }),
  postTitle: "",
  setPostTitle: action((state, payload) => { state.postTitle = payload }),
  postText: "",
  setPostText: action((state, payload) => { state.postText = payload }),
  editedTitle: "",
  setEditedTitle: action((state, payload) => { state.editedTitle = payload }),
  editedText: "",
  setEditedText: action((state, payload) => { state.editedText = payload }),
  search: "",
  setSearch: action((state, payload) => { state.search = payload }),
  searchedPosts: [],
  setSearchedPosts: action((state, payload) => { state.searchedPosts = payload }),
  likedPosts: [],
  setLikedPosts: action((state, payload) => { state.likedPosts = payload }),
  likedPostsIds: [],
  setLikedPostsIds: action((state, payload) => { state.likedPostsIds = payload }),
  getPostById: computed((state) => (id) => state?.posts?.find((post) => post._id.toString() === id)),
  postCount: computed((state) => state.searchedPosts.length),
  createPost: thunk(async (actions, payload) => {
    const { title, text } = payload.newPost;
    const hasEmptyFields = title.trim().length === 0 || text.trim().length === 0;
    if (!hasEmptyFields) {
      try {
        await api.post('/posts/', payload.newPost);
        const { data } = await api.get('/posts');
        actions.setPosts(data);
        actions.setPostTitle('');
        actions.setPostText('');
        payload.navigate('/');
      } catch (err) {
        console.error(err);
        console.error(`Error: ${err.message}`);
        toast.error(err?.response?.data?.message);
      }
    } else {
      title.trim().length === 0 && actions.setPostTitle('');
      text.trim().length === 0 && actions.setPostText('');
      toast.warn('All fields are required.');
      console.warn('All fields are required.');
    }
  }),
  deletePost: thunk(async (actions, id) => {
    try {
      await api.delete(`/posts/${id}`);
      const { data } = await api.get("/posts");
      actions.setPosts([...data]);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  }),
  editPost: thunk(async (actions, payload) => {
    const { title, text, postId } = payload.editedPost;
    const hasEmptyFields = title.trim().length === 0 || text.trim().length === 0;
    if (!hasEmptyFields) {
      try {
        await api.patch(`/posts/`, payload.editedPost);
        const { data } = await api.get("/posts");
        actions.setPosts(data);
        actions.setEditedTitle("");
        actions.setEditedText("");
        payload.navigate(`/post/${postId}`);
      }  catch (err) {
        console.error(err);
        console.error(`Error: ${err.message}`);
        toast.error(err?.response?.data?.message);
      }
    } else {
      title.trim().length === 0 && actions.setEditedTitle('');
      text.trim().length === 0 && actions.setEditedText('');
      toast.warn('All fields are required.');
      console.warn('All fields are required.');
    }
  }),
  likePost: thunk(async (actions, payload) => {
      const { userId } = payload
      try {
      await api.put(`/posts/`, payload);
      const { data: { likedPosts } } = await api.get(`posts/likedPosts/ids/${userId}`);
      actions.setLikedPostsIds(likedPosts);
    } catch (err) {
      toast.error(err?.response?.data.message);
      console.error(`Error: ${err?.response?.data?.message}`);
    }
  }),
  unlikePost: thunk(async (actions, payload) => {
    try {
      const { userId } = payload
      await api.delete(`/posts/likedPosts`, { data: payload });
      const { data: { likedPosts } } = await api.get(`posts/likedPosts/ids/${userId}`);
      actions.setLikedPostsIds(likedPosts);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.error(`Error: ${err?.response?.data?.message}`);
    }
  }),
};