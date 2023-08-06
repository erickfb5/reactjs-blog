import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserCircle, faEdit, faTrashCan, faEraser, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import moment from "moment";
import jwt_decode from "jwt-decode";

import { useAuth, useGetPostId } from "../hooks";
import { handleCleanSearch, handleDeletePost, handleLikePost } from "../utils";
import { PostNotFound } from "./";
import { customStyles } from "../customStyles";

const PostPage = () => {
  const { auth: { username, accessToken } } = useAuth();
  const { getPostById, likedPostsIds: { likedPosts } } = useStoreState((state) => state.posts);
  const { deletePost, likePost, unlikePost, setSearch } = useStoreActions((actions) => actions.posts);
  const [isLikedPost, setIsLikedPost] = useState(false);
  const [disabled, setDisabled] = useState("");
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const id = useGetPostId();
  const post = getPostById(id);
  
  const decoded = accessToken && jwt_decode(accessToken);
  const userId = decoded?.UserInfo && decoded.UserInfo.userId;
  
  const postDate = moment(post?.createdAt).calendar().toLowerCase();
  const wasPostUpdated = post?.createdAt !== post?.updatedAt;
  const lastEdited = `Last edited on ${moment(post?.updatedAt).format("LLLL")}`;
  const thumbsUpIcon = document.getElementById("thumbsUpIcon");

  useEffect(()=> {
    setIsLikedPost(likedPosts?.filter((postId) => postId === post?._id)[0] ? true : false)
  },[likedPosts, post?._id])

  return (
    <main className="PostPage">
      {post ? (
        <article className="post">
          <header className="title-container">
            <h1>{post?.title}</h1>
            <div className="title-containers-icons">
              <span data-tooltip-id="my-tooltip" data-tooltip-content={isLikedPost ? "Unlike Post" : "Like Post"}
                 aria-label={isLikedPost ? "Unlike Post" : "Like Post"}>
                <FontAwesomeIcon
                  id="thumbsUpIcon"
                  pointerEvents={disabled} // disable icon to avoid multiple clicks
                  className={isLikedPost ? "likedIcon" : "likeIcon"}
                  icon={faThumbsUp}
                  onClick={() =>
                    handleLikePost(post?._id,userId,thumbsUpIcon,likePost,unlikePost,isLikedPost,setIsLikedPost,setDisabled)
                  }
                  tabIndex={0}
                />
              </span>
              {username === post?.createdBy && (
                <>
                  <span data-tooltip-id="my-tooltip" data-tooltip-content={"Edit post"} aria-label="Edit post">
                    <FontAwesomeIcon className="editIcon" icon={faEdit} onClick={() => navigate(`/edit/${post?._id}`)} tabIndex={0}/>
                  </span>
                  <span data-tooltip-id="my-tooltip" data-tooltip-content={"Delete post"} aria-label="Delete post">
                    <FontAwesomeIcon className="deleteIcon" icon={faTrashCan} onClick={handleOpenModal} tabIndex={0}/>
                  </span>
                     <ReactModal isOpen={showModal} contentLabel="onRequestClose Example" onRequestClose={handleCloseModal}style={customStyles}>
                      <p>Are you sure you want to delete this post?</p> <br />
                      <div className="modal-buttons">
                          <button style={{backgroundColor:"var(--charcoal)"}} onClick={handleCloseModal}>Cancel</button>
                          <button style={{backgroundColor:"red"}} onClick={() => handleDeletePost(deletePost, id, navigate)}>Delete</button>
                      </div>
                    </ReactModal>
                </>
              )}
            </div>
          </header>
          <section>
            <div className="postDate">
              Posted&nbsp;<time dateTime={post?.createdAt}>{postDate}</time>
              &nbsp;&mdash;&nbsp;
              <FontAwesomeIcon className="fa-user-circle" icon={faUserCircle} />
              {post?.createdBy.toLowerCase()}
              {wasPostUpdated && (
                <span data-tooltip-id="my-tooltip" data-tooltip-content={lastEdited} aria-label={lastEdited}>&nbsp;
                  <FontAwesomeIcon className="fa-eraser" icon={faEraser} />
                </span>
              )}
            </div>

            <p className="postText">{post?.text}</p>

          </section>
            <button onClick={() => { navigate("/"); handleCleanSearch(setSearch);}} style={{ backgroundColor: "#1d2731" }}>
              <FontAwesomeIcon icon={faHome} style={{ padding: "0 5 5" }} />Home
            </button>
        </article>
      ) : ( username && <PostNotFound /> )}
      <Tooltip id="my-tooltip" />

    </main>
  );
};

export default PostPage;