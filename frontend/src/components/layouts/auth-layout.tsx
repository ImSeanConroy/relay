import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "@/context/auth-context";

function AuthLayout() {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default AuthLayout;
