import { useConversationContext } from "@/context/conversation-context";
import ConversationSidebar from "@/components/navigation/conversation-sidebar";
import NoChatSelected from "../components/no-chat-selected";
import ChatContainer from "@/components/chat/chat-container";

const HomePage = () => {
  const { selectedConversation } = useConversationContext();

  return (
    <>
      <ConversationSidebar />
      {!selectedConversation ? <NoChatSelected /> : <ChatContainer />}
    </>
  );
};
export default HomePage;
