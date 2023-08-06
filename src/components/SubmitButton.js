import { handleClickSubmit } from "../utils";

const SubmitButton = ({ ...props }) => (
  <button type="submit" onClick={(event) => handleClickSubmit(event, props)}>
    {props.action}
  </button>
);

export default SubmitButton;