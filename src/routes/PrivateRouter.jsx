import { use } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);
  console.log(user);

  if (loading) {
    return <div>loading....</div>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/auth/login" />;
  }

  return children;
};

export default PrivateRouter;
