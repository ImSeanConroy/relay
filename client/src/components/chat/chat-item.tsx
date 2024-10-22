import { UserAvatar } from "@/components/user-avatar";

export const ChatItem = () => {

  return (
    <div className="relative group flex items-center hover:bg-black/5 px-6 py-4 transition w-full">
      <div className="group flex gap-x-3 items-start w-full">
        <div
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <UserAvatar src="https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=Luna" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-1">
            <div className="flex items-center">
              <p className="font-semibold text-sm hover:underline cursor-pointer">
                Sean Conroy
              </p>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              11:38 PM
            </span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          
        </div>
      </div>
    </div>
  );
};
