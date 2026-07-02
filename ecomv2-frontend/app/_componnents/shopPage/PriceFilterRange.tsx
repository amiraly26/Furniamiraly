"use client";

import { useState, useEffect } from "react";

export type PriceRange = {
  label: string;
  min: number;
  max: number;
};

const priceRanges: PriceRange[] = [
  { label: "All prices", min: 0,max: Infinity},
  { label: "RS 0 - 19,999", min: 0, max: 19999 },
  { label: "RS 20,000 - 39,999", min: 20000, max: 39999 },
  { label: "RS 40,000 - 59,999", min: 40000, max: 59999 },
  { label: "RS 60,000 - 79,999", min: 60000, max: 79999 },
  { label: "RS 80,000+", min: 80000, max: Infinity }
];

interface Props {
  onChange: (ranges: PriceRange[]) => void;
  selectedPrice: PriceRange[];
  isOnMobile?: boolean;
}

export default function PriceFilter({ onChange,selectedPrice, isOnMobile=false }: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (index: number) => {
    setSelected((prev) => //prev is the previous state of selected ranges, automatically available
      prev.includes(index)
        ? prev.filter((i) => i !== index) //if does have the index in the ranges, remove it else add
        : [...prev, index]
    ); //selected stores selected indexes
  };

  useEffect(() => { //useEffect means whenever the second parameter passed changes, the function will execute
    onChange(selected.map((i) => priceRanges[i]));
  }, [selected]); //takes the index, converts it to PriceRange object pass to onchange
 //onChange is a prop from parent, it will send back to productlist the selected price ranges
  return (
    <div>
      <h4 className={`font-semibold text-[13px] leading-5 text-[#141718] font-poppins  ${isOnMobile? "mt-[5%] mb-[2%] ml-[2%] underline" : "mt-10 mb-4" }`}>PRICE</h4>
      <div className={`flex flex-col items-start gap-3 w-full ${isOnMobile?"ml-[1%] gap-2":""}`}>
      {priceRanges.map((range, index) => (
        <label
          key={index} className={`text-[#6C7275] w-full flex font-inter font-semibold text-[14px] ${isOnMobile? "flex-row-reverse justify-end gap-[2%]" : "items-center justify-between" }`}
        >
          {range.label}
          <input
            type="checkbox"
            checked={selected.includes(index)}
            onChange={() => toggle(index)}
            className={`
                w-4 h-4 border border-gray-400 transition-all duration-500 cursor-pointer hover:scale-105
               ${isOnMobile ? "rounded-full mt-[5px]" : " rounded-[4px]"} 
               ${selected.includes(index)? "accent-black text-white bg-black" : "bg-white"}
            `}

          />
        </label>
      ))}
      </div>
    </div>
  );
}
