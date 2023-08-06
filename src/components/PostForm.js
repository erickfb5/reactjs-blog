const PostForm = ({ ...props }) => (
    <form className="newPostForm">
      <label htmlFor="postTitle">Title:</label>
      <input
        id="postTitle"
        type="text"
        required
        autoComplete="off"
        value={props.title}
        onChange={(event) => props.setTitle(event.target.value)}
        maxLength={90}
      />
      <label htmlFor="postText">Post:</label>
      <textarea
        id="postText"
        required
        value={props.text}
        onChange={(event) => props.setText(event.target.value)}
        maxLength={2000}
      />
    </form>
  );
  export default PostForm;