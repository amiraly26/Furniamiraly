"use client";
import { GetPayloadURL } from '@/app/utils/get-payload-url';
import '../../globals.css';
import "./Reviews.css";
import React from "react";
import StarRating from '../shopPage/StarRating';
import StarRatingInput from '../global/StarRatingInput';
import { useState } from 'react';

type Review = {
  pfp?: {url:string} | null
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  productId?: number | string;
};

interface ReviewsProps {
  reviews: Review[];
  productId: number | string;
  name: string;
  avgRating: number;
}

export default function Reviews({ reviews, productId, name, avgRating }: ReviewsProps) {
    const [allReviews, setAllReviews] = React.useState<Review[]>(reviews);
    const [sortOrder, setSortOrder] = React.useState<"default" | "newest" | "oldest">("default");
    const [rating, setRating] = useState(0);
    const [visibleCount,setVisibleCount] = useState(3)
    const displayedRating = allReviews.length === 0
      ? avgRating
      : Math.round(allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length);

    const showMore =() => {
    setVisibleCount(prev => prev+3);
  };
    const showLess =() => {
    setVisibleCount(3);
  }

    // Save a new review in Payload, then add it to the page immediately without refreshing.
    const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget
        if (!form) return;

        const formData = new FormData(form);
        const reviewerName = formData.get("reviewerName")?.toString();
        const comment = formData.get("reviewComment")?.toString();
        const selectedRating = Number(formData.get("rating") || rating || 5);
        // Payload relationship fields need the numeric product ID, not the product slug.
        const payloadProductId = Number(formData.get("productId"));

        if (!reviewerName || !comment) {
            alert("Please fill in your name and comment!");
            return;
        }

        const newReview = {
            name: reviewerName,
            rating: selectedRating,
            Comment: comment,
            Date: new Date().toISOString(),
            productId: payloadProductId,
        };


        try {
            const res = await fetch(`${GetPayloadURL()}api/review-webs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReview),
            });

            const savedReview = await res.json();

            if (res.ok) {
                const doc = savedReview.doc ?? savedReview;
                // Payload stores the comment as `Comment`; the React UI reads it as `comment`.
                setAllReviews(prev => [
                    ...prev,
                    {
                        reviewerName: doc.name,
                        comment: doc.Comment,
                        rating: doc.rating,
                        date: doc.Date,
                        productId: doc.productId?.id ?? doc.productId,
                        pfp: doc.pfp ?? null,
                    },
                ]);
                setSortOrder("newest"); //new comments always appear at the top
                setVisibleCount(3);
                setRating(0);
                form.reset();
            } else {
                alert(savedReview?.errors?.[0]?.message || "Could not save review.");
            }
        } catch (err) {
            console.error("Error saving review:", err);
            alert("Could not save review. Please try again.");
        }
    };

    const sortedReviews = React.useMemo(() => {
        if (sortOrder === "default") return allReviews;
        return [...allReviews].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            if (sortOrder === "newest") {
            return dateB - dateA; //newest first
            }

            if (sortOrder === "oldest") {
            return dateA - dateB; //oldest first
            }

            return 0;
        });
    }, [allReviews, sortOrder]);

  return (
    <section className="reviews-section mb-[90px]">
        <hr className="divider" />
        <div className="upper-reviews">
            <h2>Customer Reviews</h2>
            <div className="reviews">
                <div className="stars">
                    <StarRating rating={displayedRating}/>
                </div>
                <div className="num-reviews">
                    {allReviews.length} Reviews
                </div>
            </div>
            <p className="prod-name">{name}</p>
        </div>

        <div className="reviews-form w-full">
            <form onSubmit={handleReviewSubmit} className="w-full rounded-3xl border border-[#E8ECEF] bg-white p-4
                        md:rounded-ful md:py-2 md:px-4"
            >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4 w-full">

                {/* Name Input */}
                <input
                    type="text"
                    name="reviewerName"
                    placeholder="Your name"
                    className="border border-[#E8ECEF] md:border-0 rounded-full md:rounded-none
                            bg-white focus-visible:ring-0 
                            px-4 h-10 text-sm placeholder:text-gray-400
                            md:w-32"
                />

                {/* Divider (desktop only) */}
                <div className="hidden md:block w-px h-5 bg-[#E8ECEF]" />

                {/* Comment Input */}
                <input
                    type="text"
                    name="reviewComment"
                    placeholder="Share your thoughts"
                    className="border border-[#E8ECEF] md:border-0 rounded-full md:rounded-none
                            bg-white focus-visible:ring-0 flex-1
                            px-4 text-sm placeholder:text-gray-400 py-2"
                />

                {/* Hidden product ID */}
                <input
                    type="hidden"
                    name="productId"
                    value={productId}
                />

                {/* Hidden date */}
                    <input
                    type="hidden"
                    name="date"
                    value={new Date().toISOString()}
                />

                <input type="hidden" name="rating" value={rating} />
                <StarRatingInput value={rating} onChange={setRating} />

                {/* Button INSIDE FRAME on Desktop, separated on Mobile */}
                <button
                    type="submit"
                   
                    className="rounded-full w-full md:w-auto h-10 px-6 text-sm font-medium
                            bg-[#0C1120] text-white cursor-pointer
                            transition hover:bg-[#484848]
                            md:ml-auto"
                >
                    Write Review
                </button>

                </div>
            </form>
        </div>

        <div className="filter-reviews">
            <div className="total-reviews">
                <p>{allReviews.length} Reviews</p>
            </div>

            <div className="dropdown">
                <select onChange={(e) =>setSortOrder(e.target.value as "default" | "newest" | "oldest")}>
                    <option value="default">Default</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>            
                </select>
            </div>
        </div>

        <div className="comments-section">
            <div className="comments-container">

                {sortedReviews.length > 0 ? (
                  sortedReviews.slice(0, visibleCount).map((r, index) => (
                    <React.Fragment key={index}>
                    <div className="comment-card">
                        <div className="comment-up">
                            <div className="profile-pic">
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                                  alt={`${r.reviewerName} profile`}
                                />
                            </div>

                            <div className="comment-info">
                                <h3 className="reviewer-name">{r.reviewerName}</h3>
                                <div className="ratings">
                                    <StarRating rating={r.rating}/>
                                </div>
                            </div>
                        </div>

                        <div className="comment-down">
                            <p className="comment">{r.comment}</p>
                        </div>
                    </div>
                    <hr className="comment-divider" />
                    </React.Fragment>
                ))
                ) : (
                // This shows only when there are no reviews
                <div className="empty-reviews flex flex-col items-center my-12">
                    <img
                        src="/images/textbubble.png"
                        alt="no reviews img"
                        className="w-[150px] h-auto mb-8"
                    />

                    <p className="text-black font-semibold text-2xl">
                        No reviews yet
                    </p>

                    <p className="text-gray-500 text-base mt-2">
                        Start the conversation.
                    </p>
                </div>
                )}
            </div>

            {visibleCount < allReviews.length && (
            <button className="load-btn" onClick={showMore}>Load More</button>
    )}
            {visibleCount >= allReviews.length && allReviews.length>3 && (
            <button className="load-btn" onClick={showLess}>Load less</button>
    )}
        </div>
    </section>
  );
}
