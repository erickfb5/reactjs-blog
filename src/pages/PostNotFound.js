import { Link } from "react-router-dom";

const PostNotFound = () => (
  <main>
    <h1>Post Not Found</h1>
    <p>Well, that's disappointing.</p>
    <p><Link to="/">Visit Our Homepage</Link></p>
  </main>
);
export default PostNotFound;