import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { ConversationType } from "@/types/types";

type MessageType = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
};

interface ConversationContextType {
  selectedConversation: ConversationType | null;
  setSelectedConversation: (conversation: ConversationType | null) => void;
  messages: MessageType[];
  setMessage: (messages: MessageType[]) => void;
}

const ConversationContext = createContext<ConversationContextType>({
  selectedConversation: null,
  setSelectedConversation: () => {},
  messages: [],
  setMessage: () => {},
});

export const useConversationContext = () => {
  return useContext(ConversationContext);
};

export const ConversationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [messages, setMessage] = useState<MessageType[]>([]);

  return (
    <ConversationContext.Provider
      value={{
        selectedConversation,
        setSelectedConversation,
        messages,
        setMessage,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
