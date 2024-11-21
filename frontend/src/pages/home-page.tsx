import { useConversationContext } from "@/context/conversation-context";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import ConversationSidebar from "@/components/navigation/conversation-sidebar";
import NoChatSelected from "../components/no-chat-selected";
import ChatContainer from "@/components/chat/chat-container";

const HomePage = () => {
  const { selectedConversation } = useConversationContext();

  return (
    <div className="h-screen">
      <div className="h-full flex items-center justify-center">
        <div className="h-full w-full">
          <div className="flex h-full w-full overflow-hidden">
            <NavigationSidebar />
            <ConversationSidebar />
            {!selectedConversation ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;