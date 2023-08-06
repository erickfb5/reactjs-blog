import { useParams } from "react-router-dom";

const useGetPostId = () => {
  const { id } = useParams();
  return id;
};

export default useGetPostId;