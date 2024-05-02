import { useRecoilValue } from "recoil";
import Login from "./Login";
import Register from "./Register";
import authScreenAtom from "../atoms/authAtom";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <>{authScreenState === "login" ? <Login /> : <Register />}</>;
};

export default AuthPage;
