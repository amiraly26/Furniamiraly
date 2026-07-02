"use client"
import "../../globals.css";
import './ProductListGrid.css';
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FilterCat } from "./FilterCategory";
import PriceFilter, {PriceRange} from "./PriceFilterRange";
import SortBy, { SortOption } from "./SortBy";
import { Grid2X2, Grid3X3, SlidersHorizontal } from "lucide-react";
interface ArticleProps {
  id: number;
  documentId: string;
  name: string;
  ProductId: string;
  description: string;
  images: {
    url:string,
    alternativeText:string,
  },
  featuredImage:{
    url: string,
    alternativeText:string,
  }
  price: number;
  rating: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
interface ProductListProps {
  component: React.ComponentType<ArticleProps>;
  articles: ArticleProps[];
  uniquecategories:string[];
  allReviews:any;
}


export  function ProductListClient({
  component,
  articles,
  uniquecategories,
  allReviews
}: Readonly<ProductListProps>) {
  const [visibleCount,setVisibleCount] = useState(9)
  const searchParams = useSearchParams();
  const [PriceFilters, setPriceFilters] = useState<PriceRange[]>([]);
  const [open, setOpen]=useState(false);
  const selectedCategory = searchParams.get("query") ?? "All Rooms";

  //After passing through child function, pricefilters now stores all selected price ranges objects
  const showMore =() => {
    setVisibleCount(prev => prev+6);
  };
  const showLess =() => {
    setVisibleCount(9);
  }
  const Component = component;
  const [sortOption, setSortOption] = useState<SortOption>("none");

const filteredArticles = useMemo(() => {
  let result = [...articles];


  if(searchParams.has("search") && searchParams.get("search")?.length > 0){
    const term = searchParams.get("search");
    result = result.filter((searched)=>{
      return searched.title.toLowerCase().includes(term.toLowerCase());
    })
  }


  // Apply price filter
  if (PriceFilters.length > 0) {
    result = result.filter((a) =>
      PriceFilters.some((range) => {
        const finalPrice = a.price * ((100 - a.PercentageDiscount) / 100);
        return finalPrice >= range.min && finalPrice <= range.max;
      })
    );
  }

  

  // Apply sorting
  if (sortOption === "lowest") {
    result.sort((a, b) => 
      (a.price * ((100 - a.PercentageDiscount) / 100)) -
      (b.price * ((100 - b.PercentageDiscount) / 100))
    );
  } else if (sortOption === "highest") {
    result.sort((a, b) => 
      (b.price * ((100 - b.PercentageDiscount) / 100)) -
      (a.price * ((100 - a.PercentageDiscount) / 100))
    );
  } else if (sortOption === "az") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "za"){
    result.sort((a, b)=> b.title.localeCompare(a.title));
  }

  return result;
}, [articles, PriceFilters, sortOption, searchParams]);

  return (
    <section className="shop-products">
  <div className="shop-products__sidebar">
    {/* Full filtering div */} {/* Hidden on smaller devices */}

    <div>
      {/* Filter by category */}
      <div className="shop-filter-title">
        <SlidersHorizontal size={18} strokeWidth={1.8} />
        <h4>Filter</h4>
      </div>

      <h4 className="shop-filter-heading">CATEGORIES</h4>
      <FilterCat categories={uniquecategories} selected={selectedCategory} />
    </div>

    {/* a change in price filter will trigger this */}
    <PriceFilter selectedPrice={PriceFilters} onChange={setPriceFilters} />
  </div>
  <div className="shop-mobile-filter-bar" >
    <div onClick={()=> setOpen(!open)} className="shop-mobile-filter-trigger">
      <SlidersHorizontal size={18} strokeWidth={1.8} />
      <h4>Filter</h4>
    </div>
  </div>
    {/* BACKDROP */}
    <div
  onClick={() => setOpen(false)}
  className={`
    fixed inset-0 bg-black/40 z-20
    transition-opacity duration-500
    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />


    {/* BOTTOM SHEET */}
    <div
  className={`
    fixed bottom-0 left-0 w-full h-[70%]
    bg-white rounded-t-2xl overflow-hidden shadow-xl z-30
    transform transition-transform duration-500 ease-out md:hidden
    ${open ? "translate-y-0 visible" : "translate-y-full invisible"}
  `}
>
  {/* Drag handle */}
  <div className="flex justify-center py-2">
    <div className="flex flex-col items-center gap-[1.5px]">
      <hr className="w-10 h-[3px] bg-gray-300 border-0 rounded-full" />
      <hr className="w-10 h-[2px] bg-gray-300 border-0 rounded-full" />
    </div>
  </div>

  {/* Content wrapper */}
  <div className="px-4 pb-10 h-full overflow-y-auto ml-[1%]">
    <h4 className="font-semibold font-poppins text-[25px] ml-[2%]">Filter</h4>

    <div className="mb-4">
      <h4 className="font-poppins font-semibold text-[110%] mb-2 underline ml-[2%]">
        CATEGORIES
      </h4>
      <FilterCat
        categories={uniquecategories}
        selected={selectedCategory}
        isOnMobile
      />
    </div>

    <PriceFilter
      selectedPrice={PriceFilters}
      onChange={setPriceFilters}
      isOnMobile
    />
  </div>
</div>

  <div className="shop-products__main">
    <div className="shop-products__toolbar">
        <h2>{selectedCategory + ((searchParams.has("search") && searchParams.get("search")?.trim().length > 0) ? ` with "${searchParams.get("search")?.trim()}"` : "")}</h2>
        <div className="shop-products__actions">
          <SortBy onChange={setSortOption} />
          <div className="shop-view-toggle">
            <button type="button" aria-label="Three column grid"><Grid3X3 size={18} strokeWidth={1.7} /></button>
            <button type="button" aria-label="Two column grid"><Grid2X2 size={18} strokeWidth={1.7} /></button>
          </div>
        </div>
    </div>
    <div className="products_grid">
      {filteredArticles.slice(0, visibleCount).map((article) => (
        <Component key={article.documentId} {...article} images={article.featuredImage} allReviews={allReviews} />
      ))}
    </div>

    {visibleCount < filteredArticles.length && (
      <button className="shop-show-more" onClick={showMore}>Show more</button>
    )}
    {visibleCount >= filteredArticles.length && filteredArticles.length>6 && (
      <button className="shop-show-more" onClick={showLess}>Show less</button>
    )}

    {filteredArticles.length == 0 && ( <h5 className="text-gray-600">No available products at the moment.</h5>)}
  </div>
</section>)
}
