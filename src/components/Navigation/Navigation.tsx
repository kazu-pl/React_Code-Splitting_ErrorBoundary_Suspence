import { Link } from "react-router-dom";
import { PATHS } from "common/paths";

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to={PATHS.HOME}>HOME</Link>
      </li>
      <li>
        <Link to={PATHS.LOGIN}>LOGIN</Link>
      </li>
      <li>
        <Link to={PATHS.LOGOUT}>LOGOUT</Link>
      </li>
      <li>
        <Link to={PATHS.ACCOUNT}>ACCOUT</Link>
      </li>
    </ul>
  );
};

export default Navigation;
