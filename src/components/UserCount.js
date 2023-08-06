import { useStoreState } from "easy-peasy";

const UserCount = () => {
  const { userCount } = useStoreState((state) => state.users);
  return (
    <section className="PostCount">
      <p>{userCount === 1 ? `${userCount} user` : `${userCount} users`}</p>
    </section>
  );
};
export default UserCount;