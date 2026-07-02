"use client"
import Link from "next/link";
import ProductCard from "./ProductCard";
import Reviews from "./Reviews";
import { Card } from "../shopPage/Card";
import { ArticleProps } from "@/app/data/types";

interface PageRendererProps{
    product: ArticleProps & { measurement?: string; stock?: number; rating?: number; featured?: boolean; colour?: Array<{ name: string }> },
    reviews:Array<{ reviewerName: string; comment: string; rating: number; date: string }>
    productId: string;
    name: string;
    avgRating: number;
    relatedProducts?: ArticleProps[];
}

export function PageRenderer({product,reviews,productId,name, avgRating, relatedProducts = []}:Readonly<PageRendererProps>){
    return (
        <main className="relative pt-[128px]">
            <ProductCard product={product} avgRating={avgRating} documentId={productId} numReviews={reviews.length}/>
            <Reviews reviews={reviews} productId={product.id} name={name} avgRating={avgRating}/>
            {relatedProducts.length > 0 && (
              <section className="product-related">
                <div className="product-related__head">
                  <h2>You might also like</h2>
                  <Link href="/shop">
                    More Products <span className="material-symbols-outlined">arrow_right_alt</span>
                  </Link>
                </div>
                <div className="product-related__grid">
                  {relatedProducts.map((article) => (
                    <Card
                      key={article.documentId}
                      {...article}
                      images={article.featuredImage ?? article.images?.[0]}
                      allReviews={[]}
                      isOnHome
                    />
                  ))}
                </div>
              </section>
            )}
            <section className="product-newsletter">
              <div className="product-newsletter__visual product-newsletter__visual--left" />
              <div className="product-newsletter__content">
                <h2>Join Our Newsletter</h2>
                <p>Sign up for deals, new products and promotions</p>
                <form>
                  <span className="material-symbols-outlined">mail</span>
                  <input type="email" placeholder="Email address" aria-label="Email address" />
                  <button type="submit">Signup</button>
                </form>
              </div>
              <div className="product-newsletter__visual product-newsletter__visual--right" />
            </section>
        </main>
    );
}
