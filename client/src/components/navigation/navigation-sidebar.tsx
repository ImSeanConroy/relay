import { useConversationContext } from "@/context/conversation-context";
import { useEffect, useState } from "react";

type ConversationType = {
  id: string;
  fullname: string;
  username: string;
};

const NavigationSidebar = () => {

  const { selectedConversation, setSelectedConversation } =
    useConversationContext();

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
        onClick={() => setSelectedConversation(conversation)}
        className={
          conversation.id === selectedConversation?.id ? "font-bold" : ""
        }
      >
        <p className="cursor-pointer">{conversation.fullname}</p>
      </div>
    ))}
    {isLoading && <span>Loading...</span>}
  </div>
  )
}

export default NavigationSidebar