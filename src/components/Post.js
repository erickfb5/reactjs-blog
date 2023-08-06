import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEraser, faThumbsUp, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import moment from "moment";

const Post = ({ post }) => {
  const { likedPostsIds: { likedPosts } } = useStoreState((state) => state.posts);

  const postDate = `Posted on ${moment(post?.createdAt).format("LLLL")}`;
  const wasPostUpdated = post?.createdAt !== post?.updatedAt;
  const lastEdited = `Last edited on ${moment(post?.updatedAt).format("LLLL")}`;

  return (
    <article className="post">
      <Link to={`/post/${post?._id}`}>
        <section className="created-by">
          {wasPostUpdated && (
            <div data-tooltip-id="my-tooltip" data-tooltip-content={lastEdited}>
              <FontAwesomeIcon className="fa-eraser" icon={faEraser} />
            </div>
          )}
          <FontAwesomeIcon className="fa-user-circle" icon={faUserCircle} />
          {post?.createdBy?.toLowerCase()}
        </section>
        <h2 className="postTitle">{post?.title}</h2>
        <p className="postText">
          {post?.text.length <= 25 ? post?.text : `${post?.text.slice(0, 200)}...`}
        </p>
        <section className="created-at">
          
          <div className="liked-post">
            {likedPosts?.map((postId) => 
            postId === post?._id && (
               <span key={postId}  data-tooltip-id="my-tooltip" data-tooltip-content="You liked this post!">
                  <FontAwesomeIcon
                    key={postId} 
                    id="thumbsUpIcon"
                    className="fa-star" icon={faThumbsUp} 
                  />
              </span>)
              )}
          </div>
          <div data-tooltip-id="my-tooltip" data-tooltip-content={postDate}>
            <FontAwesomeIcon className="fa-clock" icon={faClock} />
            {moment(post?.createdAt).fromNow()}
          </div>
        </section>
        </Link>
      <Tooltip id="my-tooltip" />
    </article>
  );
};

export default Post;