"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

type StarRatingInputProps = {
  value: number;
  onChange: (rating: number) => void;
};

export default function StarRatingInput({
  value,
  onChange,
}: StarRatingInputProps) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex gap-2 text-2xl text-yellow-500">
      {Array.from({ length: 5 }, (_, i) => {
        const ratingValue = i + 1;

        return (
          <button
            style={{
              background:"none",
              border:"none",
              padding:0,
              margin:0,
              
            }}
            key={i}
            type="button"
            onClick={() => onChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <FaStar
              style={{
                color: ratingValue <= (hover ?? value)? "black" :"lightgray"
              }} 
            />
          </button>
        );
      })}
    </div>
  );
}