import { useSocketContext } from "@/context/socket-context";
import { ConversationType } from "@/types/types";

type ConversationItemProps = {
  conversation: ConversationType;
  selectedConversationId: string | undefined;
  onSelectConversation: (conversation: ConversationType) => void;
};

const ConversationItem = ({
  conversation,
  selectedConversationId,
  onSelectConversation,
}: ConversationItemProps) => {
  const { onlineUsers } = useSocketContext();

  return (
    <button
      onClick={() => onSelectConversation(conversation)}
      className={`
        w-full py-3 px-4 flex items-center gap-3
        hover:bg-base-300/50 transition-colors border-b border-base-300
        ${
          selectedConversationId === conversation.id
            ? "bg-base-300/50 ring-1 ring-base-300"
            : ""
        }
      `}
    >
      <div className="relative mx-auto lg:mx-0">
        <img
          src={conversation.profilePicture || "/avatar.png"}
          alt={conversation.fullname}
          className="size-9 object-cover rounded-full"
        />
        {onlineUsers.includes(conversation.id) && (
          <span
            className="absolute bottom-0 right-0 size-3 bg-green-500 
              rounded-full ring-2 ring-base-100 hover:ring-base-300"
          />
        )}
      </div>

      <div className="hidden lg:block text-left min-w-0">
        <div className="font-medium truncate">{conversation.fullname}</div>
        {/* <div className="text-sm text-zinc-400">
          {onlineUsers.includes(conversation.id) ? "Online" : "Offiline"}
        </div> */}
      </div>
    </button>
  );
};

export default ConversationItem;
