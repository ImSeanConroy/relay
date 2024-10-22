import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { ServerSearch } from "./server-search";
import { ServerSection } from "./server-section";
import { ServerMember } from "./server-member";

export const ServerSidebar = () => {
  return (
    <div className="flex flex-col h-full text-primary w-full bg-[#2B2D31]">
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch />
        </div>
        <Separator className="bg-zinc-500 rounded-md my-2" />

        <div className="mb-2">
          <ServerSection />
          <div className="space-y-[2px]">
            <ServerMember
              name="Sean Conroy"
              img="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Bob"
            />
            <ServerMember
              name="Sean Conroy"
              img="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Kiki"
            />
            <ServerMember
              name="Sean Conroy"
              img="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Bella"
            />
            <ServerMember
              name="Sean Conroy"
              img="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Harley"
            />
          </div>
        </div>

        <div className="mb-2">
          <ServerSection />
          <div className="space-y-[2px]">
            <ServerMember
              name="Sean Conroy"
              img="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Abby"
            />
            <ServerMember
              name="Sean Conroy"
              img="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Angel"
            />
            <ServerMember
              name="Sean Conroy"
              img="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Loki"
            />
            <ServerMember
              name="Sean Conroy"
              img="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Tinkerbell"
            />
            <ServerMember
              name="Sean Conroy"
              img="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Garfield"
            />
          </div>
        </div>
        <div className="pb-6"></div>
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
