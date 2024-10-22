import { Search } from "lucide-react";

export const ServerSearch = () => {
  return (
    <button className="group px-3 py-3 mt-3 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition">
      <Search className="w-4 h-4 text-zinc-400" />
      <p className="font-semibold text-sm text-zinc-400 transition">Search</p>
      <kbd className="text-zinc-400 bg-[#2B2D31] border-zinc-400 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
        <span className="text-xs ">⌘</span>K
      </kbd>
    </button>
  );
};
