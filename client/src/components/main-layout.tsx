import { NavigationSidebar } from "./navigation/navigation-sidebar";
import ServerSidebar from "./server/server-sidebar";

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";

const MainLayout = () => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">
        <div className="h-full">
          <div className="hidden md:flex h-full w-72 z-20 flex-col fixed inset-y-0">
            <ServerSidebar />
          </div>
          <main className="h-screen md:pl-72">
            <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
              <ChatHeader />
              <ChatMessages />
              <ChatInput />
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
