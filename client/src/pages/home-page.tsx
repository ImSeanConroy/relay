import { useAuthContext } from "@/context/auth-context";

import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import ChatContainer from "@/components/chat/chat-container";

const HomePage = () => {
  const { isLoading, logout } = useAuthContext();
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <h1>HomePage</h1>
        <button onClick={logout}>{isLoading ? "Loading..." : "Logout"}</button>
      </div>
      <NavigationSidebar />
      <ChatContainer />
    </div>
  );
};

export default HomePage;
