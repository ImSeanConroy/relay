import { useAuthContext } from "@/context/auth-context";
import { useConversationContext } from "@/context/conversation-context";
import { extractTime } from "@/utils/extract-time";
import { useEffect, useState } from "react";

const ChatMessages = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { authUser } = useAuthContext();
  const { messages, setMessage, selectedConversation } =
    useConversationContext();

  useEffect(() => {
    const getConversations = async () => {
      try {
        if (!selectedConversation) return;

        setIsLoading(true);
        setMessage([]);

        const res = await fetch(`/api/messages/${selectedConversation.id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        setMessage(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getConversations();
  }, [selectedConversation, setMessage]);

  return (
    <div className="flex flex-col gap-4">
      <p>Messages:</p>
      {!isLoading &&
        messages.map((message) => (
          <div
            className={
              message?.senderId === authUser?.id ? "text-right" : "text-left"
            }
          >
            <p className="cursor-pointer">{message.body}</p>
            <span className="text-xs">{extractTime(message.createdAt)}</span>
          </div>
        ))}

      {!isLoading && messages.length == 0 && (
        <p>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default ChatMessages;
