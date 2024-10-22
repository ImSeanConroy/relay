import { Separator } from "../ui/separator";
import { ModeToggle } from "../mode-toggle";

export const NavigationSidebar = () => {
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#1E1F22] py-3">
      <Separator className="bg-zinc-300 rounded-md w-10 mx-auto" />
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
      </div>
    </div>
  );
};
