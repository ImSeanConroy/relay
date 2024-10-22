import { ChatWelcome } from "./chat-welcome";
import { ChatItem } from "./chat-item";

export const ChatMessages = () => {

  return (
    <div className="flex flex-col py-4 overflow-y-auto">
      <ChatWelcome name={"Sean Conroy"}/>
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </div>
    )
}
