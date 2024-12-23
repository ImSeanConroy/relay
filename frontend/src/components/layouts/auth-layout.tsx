import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "@/context/auth-context";
import NavigationSidebar from "../navigation/navigation-sidebar";

function AuthLayout() {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen">
      <div className="h-full flex items-center justify-center">
        <div className="h-full w-full">
          <div className="flex h-full w-full overflow-hidden">
            <NavigationSidebar />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
