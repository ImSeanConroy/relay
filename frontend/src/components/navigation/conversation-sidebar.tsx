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
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const filteredConversations = conversations.filter((conversation) =>
    conversation.fullname?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="bg-base-200 h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5 hover:bg-base-300/50">
        <div className="h-full flex items-center gap-2">
          <Search className="size-6" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none flex-grow pl-2 placeholder-base-content"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {!isLoading ? (
        <div className="overflow-y-auto w-full">
          {filteredConversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              selectedConversationId={selectedConversation?.id}
              onSelectConversation={setSelectedConversation}
            />
          ))}

          {filteredConversations.length === 0 && (
            <div className="text-center text-zinc-500 py-8">
              No conversations found
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-y-auto w-full">
          <div className="text-center text-zinc-500 py-8">
            Loading conversations
          </div>
        </div>
      )}
    </aside>
  );
};

export default ConversationSidebar;
