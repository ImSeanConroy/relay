import { useEffect, useState } from "react";

import ChatInput from "./chat-input";
import { useConversationContext } from "@/context/conversation-context";
import ChatHeader from "./chat-header";
import { useSocketContext } from "@/context/socker-context";
import { useAuthContext } from "@/context/auth-context";
import { extractTime } from "@/utils/extract-time";

const ChatContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { socket } = useSocketContext();
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

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessage([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage")
    }
  }, [socket, messages, setMessage]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1">Loading...</div>
      <ChatInput />
      </div>
      )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${message.senderId === authUser?.id ? "chat-end" : "chat-start"}`}
            // ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser?.id
                      ? authUser.profilePicture || "/avatar.png"
                      : selectedConversation?.profilePicture || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {extractTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.body && <p>{message.body}</p>}
            </div>
          </div>
        ))}
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
