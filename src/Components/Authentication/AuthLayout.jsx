import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ authentication = true, children }) {
  const navigate = useNavigate();
  const userLoginState = useSelector((state) => state.auth?.status);

  useEffect(() => {
    if (authentication && authentication !== userLoginState) {
      navigate("/login");
    } else if (!authentication && authentication !== userLoginState) {
      navigate("/");
    }
  }, [navigate, userLoginState]);

  return <div>{children}</div>;
}

export default AuthLayout;
