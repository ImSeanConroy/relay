import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { ConversationType } from "@/types/types";
import { useConversationContext } from "@/context/conversation-context";
import ConversationItem from "@/components/navigation/conversation-item";
import Alert from "@/components/alert";

const ConversationSidebar = () => {
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
          toast.custom(() => <Alert message={data.error} type="error" />);
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
    <aside className="bg-base-200 h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="h-full flex items-center gap-2">
          <Search className="size-6" />
          <span className="font-medium hidden lg:block">Search</span>
        </div>
      </div>

      {!isLoading && (
        <div className="overflow-y-auto w-full">
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              selectedConversationId={selectedConversation?.id}
              onSelectConversation={setSelectedConversation}
            />
          ))}

          {conversations.length === 0 && (
            <div className="text-center text-zinc-500 py-4">
              No online users
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default ConversationSidebar;
