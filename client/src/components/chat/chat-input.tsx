import { useConversationContext } from "@/context/conversation-context";
import { useState } from "react";

const ChatInput = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const { messages, setMessage, selectedConversation } =
    useConversationContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await sendMessage(newMessage);
    setNewMessage("");
  };

  const sendMessage = async (message: string) => {
    try {
      if (!selectedConversation) return;

      setIsLoading(true);
      setMessage([]);

      const res = await fetch(`/api/messages/send/${selectedConversation.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setMessage([...messages, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border-zinc-500 border"
        />
        <button>{isLoading ? "Loading..." : "Send"}</button>
      </form>
    </div>
  );
};

export default ChatInput;
