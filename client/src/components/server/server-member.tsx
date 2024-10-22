import { cn } from "@/lib/utils";
import { UserAvatar } from "../user-avatar";

export const ServerMember = ({
  img,
  name,
}: {
  img: string;
  name: string;
}) => {
  return (
    <button
      className={cn(
        "group px-3 py-2 rounded-md flex items-center gap-x-3 w-full hover:bg-zinc-700/50 transition mb-1"
      )}
    >
      <UserAvatar src={img} className="h-8 w-8 md:h-8 md:w-8" />
      <div className="flex items-center ">
        <p
          className={cn(
            "font-semibold text-sm text-zinc-400 group-hover:text-zinc-300 transition"
          )}
        >
          {name}
        </p>
      </div>
    </button>
  );
};
