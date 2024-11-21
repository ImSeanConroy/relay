import { MessageSquare, LogOut, Settings } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { Link } from "react-router-dom";

const NavigationSidebar = () => {
  const { logout } = useAuthContext();

  return (
    <aside className="bg-base-300 hidden lg:flex h-full w-16 border-r border-base-300 flex-col justify-between transition-all duration-200">
      <Link to={"/"} className="border-b border-base-300 w-full p-5 bg-primary/10">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-6 text-primary" />
        </div>
      </Link>

      <div>
        <Link to={"settings"}>
        <div className="border-b border-t border-base-300 w-full p-5">

          <div className="flex items-center gap-2">
            <Settings className="size-6" />
          </div>
        </div>
        </Link>

        <button
          className="border-b border-base-300 w-full p-5"
          onClick={logout}
        >
          <div className="flex items-center gap-2">
            <LogOut className="size-6" />
          </div>
        </button>
      </div>
    </aside>
  );
};
export default NavigationSidebar;
