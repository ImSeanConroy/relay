import { UserAvatar } from "@/components/user-avatar";
import { Separator } from "../ui/separator";

export const ChatHeader = () => {
  return (
    <>
    <div className="text-md font-semibold px-4 py-3 flex items-center">
        <UserAvatar 
          src="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Luna"
          className="h-8 w-8 md:h-10 md:w-10 mr-3"
          />
      <p className="font-semibold text-xl text-black dark:text-white">
        Sean Conroy
      </p>
      <div className="ml-auto flex items-center">
      </div>
    </div>
    <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md px-3" />
    </>
  );
};
