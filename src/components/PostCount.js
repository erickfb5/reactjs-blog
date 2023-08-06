import { useStoreState } from "easy-peasy";

const PostCount = () => {
  const { postCount } = useStoreState((state) => state.posts);
  return (
    <section className="PostCount">
      <p>{postCount === 1 ? `${postCount} post` : `${postCount} posts`}</p>
    </section>
  );
};
export default PostCount;