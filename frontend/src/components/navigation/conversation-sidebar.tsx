import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useConversationContext } from "@/context/conversation-context";
import { useSocketContext } from "@/context/socker-context";

type ConversationType = {
  id: string;
  fullname: string;
  username: string;
};

const ConversationSidebar = () => {
  const { selectedConversation, setSelectedConversation } =
    useConversationContext();

  const { onlineUsers } = useSocketContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getConversations();
  }, []);

  if (isLoading) return "Loading..";

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="h-full flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => setSelectedConversation(conversation)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedConversation?.id === conversation.id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={conversation.profilePicture || "/avatar.png"}
                alt={conversation.fullname}
                className="size-10 object-cover rounded-full"
              />
              {onlineUsers.includes(conversation.id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-base-100 hover:ring-base-300"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{conversation.fullname}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(conversation.id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {conversations.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default ConversationSidebar;