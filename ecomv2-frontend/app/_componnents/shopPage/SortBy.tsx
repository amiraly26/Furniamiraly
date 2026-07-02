"use client";

import { useState } from "react";
import Image from "next/image";

export type SortOption = "lowest" | "highest" | "az" | "za" |"none";

export default function SortBy({ onChange }: { onChange: (o: SortOption) => void }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SortOption>("none");

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Sort label clickable */}
      <div
        className="flex items-center gap-1 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold font-inter md:text-[14px] text-[14px] mr-[5px] text-[#141718]">Sort by</span>
        <Image
          src="/Vector.svg"
          alt="Open"
          width={16}
          height={16}
          className={`transition-transform duration-200 w-[12px] h-[12px]  ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 right-0 bg-white shadow-lg border border-[#E8ECEF] rounded-md w-36 z-20 overflow-hidden">
          <button
            onClick={() => handleSelect("lowest")}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
          >
            Lowest price
          </button>
          <button
            onClick={() => handleSelect("highest")}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
          >
            Highest price
          </button>
          <button
            onClick={() => handleSelect("az")}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
          >
            A - Z
          </button>
          <button
            onClick={() => handleSelect("za")}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
           >
            Z - A
          </button>
        </div>
      )}
    </div>
  );
}
