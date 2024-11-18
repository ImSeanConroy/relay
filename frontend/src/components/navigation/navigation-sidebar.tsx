import { useConversationContext } from "@/context/conversation-context";
import { useSocketContext } from "@/context/socker-context";
import { useEffect, useState } from "react";

type ConversationType = {
  id: string;
  fullname: string;
  username: string;
};

const NavigationSidebar = () => {
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

  return (
    <div className="flex gap-4">
      <p>Conversations:</p>
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => setSelectedConversation(conversation)}
          className={
            conversation.id === selectedConversation?.id ? "font-bold" : ""
          }
        >
          <div className="flex gap-2 items-center">

          <p className="cursor-pointer">
            {conversation.fullname}
          </p>
            <span
              className={`w-2 h-2 rounded-full ${
                onlineUsers.includes(conversation.id)
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></span>
          </div>

        </div>
      ))}
      {isLoading && <span>Loading...</span>}
    </div>
  );
};

export default NavigationSidebar;
