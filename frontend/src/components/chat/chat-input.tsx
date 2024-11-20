import { useConversationContext } from "@/context/conversation-context";
import { useState } from "react";
import { Send } from "lucide-react";

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
    <div className="p-4 w-full">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn" disabled={isLoading}>
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
