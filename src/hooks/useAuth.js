import { useStoreActions, useStoreState } from "easy-peasy";

const useAuth = () => {
  const { auth } = useStoreState((state) => state.auth);
  const { setAuth } = useStoreActions((actions) => actions.auth);

  return { auth, setAuth };
};

export default useAuth;