import { FaStar, FaRegStar } from "react-icons/fa";

type StarRatingProps = {
    rating: number;
    color?: string
}

export default function StarRating({rating, color}:StarRatingProps){
    return(
        <div className="flex flex-row" style={{color:`${color ? `${color}` : ''}`}}>
            {Array.from({length:5},(_,i)=> //we dont need the value, we need just the index
             i<Math.round(rating)?<svg  key={i} xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="18px" fill={color? `${color}` : "black"}><path d="m243-144 63-266L96-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Z" /></svg> : <svg  key={i} xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill={color? `${color}` : "black"}><path d="m352-293 128-76 129 76-34-144 111-95-147-13-59-137-59 137-147 13 112 95-34 144ZM243-144l63-266L96-589l276-24 108-251 108 252 276 23-210 179 63 266-237-141-237 141Zm237-333Z"/></svg>/*<FaStar key={i}/> : <FaRegStar key={i}/>*/
            )}
        </div>
    )
}