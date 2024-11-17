import { useAuthContext } from "@/context/auth-context";

import ChatMessages from "@/components/chat/chat-messages";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";

const HomePage = () => {
  const { isLoading, logout } = useAuthContext();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <h1>HomePage</h1>
        <button onClick={logout}>{isLoading ? "Loading..." : "Logout"}</button>
      </div>
      <NavigationSidebar />
      <ChatMessages />
    </div>
  );
};

export default HomePage;
