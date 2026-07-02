"use client";

import { useState } from "react";
import StarRatingInput from "./StarRatingInput";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    // send rating to DB here
  };

  return (
    <div className="p-4">
      <h2 className="font-bold mb-2">Rate this product</h2>

      <StarRatingInput value={rating} onChange={setRating} />

      <button
        className="mt-4 bg-black text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}