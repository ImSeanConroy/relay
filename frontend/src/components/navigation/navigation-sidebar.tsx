import { useEffect } from "react";
import { MessageSquare, LogOut, Settings } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";


const NavigationSidebar = () => {
 
  const { logout } = useAuthContext();
  
  return (
    <aside className="hidden lg:flex h-full w-16 border-r border-base-300 flex-col justify-between transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5 bg-primary/10">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-6 text-primary" />
        </div>
      </div>

      <button className="border-b border-base-300 w-full p-5" onClick={logout}>
        <div className="flex items-center gap-2" onClick={logout}>
          <LogOut className="size-6" />
        </div>
      </button>      
    </aside>
  );
};
export default NavigationSidebar;