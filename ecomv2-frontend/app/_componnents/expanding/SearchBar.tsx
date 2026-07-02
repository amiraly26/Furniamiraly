import { Search, X, LucideIcon } from "lucide-react";
interface ExpandingSearchBarProps {
  icon?: LucideIcon;
}

export function SearchBar() {
    return (
        <div className="relative h-12 w-[44px] group">
      <div
        className="absolute right-0 top-0 flex items-center justify-center h-9 w-9 mt-[6px] rounded-full 
                   bg-transparent transition-all duration-500 ease-out
                   group-hover:bg-white"
      >
        <button className="absolute right-2 flex items-center justify-center transition-all duration-300 cursor-pointer text-search-icon">
        <Search className="w-6 h-6 stroke-[1.5]" />
      </button>
      </div>
    </div>
    )
}