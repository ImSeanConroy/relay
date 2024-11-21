import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "@/context/auth-context";

function NonAuthLayout() {
  const { authUser } = useAuthContext();

  if (authUser) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default NonAuthLayout;
