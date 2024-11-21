import { useConversationContext } from "@/context/conversation-context";
import { useSocketContext } from "@/context/socket-context";

const ChatHeader = () => {
  const { selectedConversation } = useConversationContext();
  const { onlineUsers } = useSocketContext();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 ml-1 rounded-full relative">
              <img src={selectedConversation!.profilePicture || "/avatar.png"} alt={selectedConversation!.fullname} />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedConversation!.fullname}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedConversation!.id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;