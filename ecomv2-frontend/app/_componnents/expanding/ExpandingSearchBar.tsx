import { useState, useRef } from "react";
import { Search, X, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce, useDebouncedCallback } from "use-debounce";

interface ExpandingSearchBarProps {
  icon?: LucideIcon;
}

const ExpandingSearchBar = ({ icon: Icon = Search }: ExpandingSearchBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  

  const handleIconClick = () => {
    setIsExpanded(true);
    inputRef.current?.focus();
  };
  
  const handleKeyPress = (e) => {
    if(e.key === "Enter" && e.target.value.trim().length !== 0) {
      e.target.blur();
      router.push(`/shop?search=${e.target.value.trim()}`);
    }
  }
  const handleClear = () => {
    setSearchValue("");
    inputRef.current?.focus();
    if(path.startsWith("/shop")){
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.replace(`${path}${searchParams && "?"+params.toString()}`);
    } 
  };
  const debounce = useDebouncedCallback((e: Event)=>{
      const term = e.target.value.trim().length > 0;
      const queryParams = new URLSearchParams(searchParams.toString());
      if(term) {
        queryParams.set("search", e.target.value.trim())
      } else {
        queryParams.delete("search")
      }
      router.replace(`${path}?${queryParams.toString()}`, {scroll: false},)


  }, 150)
  const handLeChange = (e) => {
    setSearchValue(e.target.value);
    if(path === "/shop") {
      debounce(e);
      setTimeout(()=>{
        e.target.blur()
      },3000)
    }
  }

  return (

      <div className="relative h-12 w-1">
      <div
        className={cn(
          "absolute right-0 top-0 flex items-center h-9 mt-[6px] rounded-full transition-all duration-350 ease-out",
          isExpanded || isFocused
            ? "w-55 bg-search-expanded bg-white shadow-search-glow"
            : "w-0 bg-transparent p-0"
        )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => !isFocused && setIsExpanded(false)}
    >
      {/* Clear Button */}
      {searchValue && (isExpanded || isFocused) && (
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleClear();
          }}
          className="absolute left-[9px] rounded-full text-search-icon hover:text-search-icon-active hover:bg-search-clear-hover transition-colors duration-200 z-20"
        >
          <X className="w-[12] h-[11]" />
        </button>
      )}

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handLeChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setIsExpanded(false);
        }}
        onKeyDown={handleKeyPress}
        placeholder="Seeking something?"
        className={cn(
          "w-full h-full bg-transparent pl-6 pr-9 text-search-text text-[12px] placeholder:text-search-placeholder outline-none transition-opacity duration-300 relative z-10",
          isExpanded || isFocused ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Search Icon */}
      <button
        onClick={handleIconClick}
        className={cn(
          "absolute right-2 flex items-center justify-center transition-all duration-300 cursor-pointer",
          isExpanded || isFocused ? "text-search-icon-active" : "text-search-icon"
        )}
      >
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </button>

      {/* Animated Border */}
      <div
        className={cn(
          "absolute inset-0 rounded-[20px] border transition-all duration-500 pointer-events-none",
          isExpanded || isFocused
            ? "border-search-border-active opacity-100"
            : "border-transparent opacity-0"
        )}
      />
      </div>
    </div>
  );
};

export default ExpandingSearchBar;
