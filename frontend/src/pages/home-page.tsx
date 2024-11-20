import ConversationSidebar from "@/components/navigation/conversation-sidebar";
import { useConversationContext } from "@/context/conversation-context";
import NoChatSelected from "../components/no-chat-selected";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import ChatContainer from "@/components/chat/chat-container";

const HomePage = () => {
  const { selectedConversation } = useConversationContext();

  return (
    <div className="h-screen bg-base-200">
      <div className="h-full flex items-center justify-center p-4">
        <div className="h-full bg-base-100 rounded-lg shadow-cl w-full">
          <div className="flex h-full w-full rounded-lg overflow-hidden">
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