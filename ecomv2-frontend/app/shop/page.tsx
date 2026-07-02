"use server"
import StarRating from "@/app/_componnents/shopPage/StarRating";
import ReviewForm from "@/app/_componnents/global/StarRatingForm";
import { getShopPage } from "../data/loaders";
import { ProductList } from "../_componnents/shopPage/ProductList";
import { Card } from "../_componnents/shopPage/Card";
import { getCategories} from "../utils/getCategories"
import dynamic from "next/dynamic";
import "./page.css";
import { getPayloadMediaURL } from "../utils/get-payload-url";

interface PageProps {
  searchParams: Promise<{ query?: string; }>;
}

async function loader() {
  const { data } = await getShopPage();
  return {hero: data?.[0]?.blocks ?? []};
}

const Breadcrumbs = dynamic(()=>import("../_componnents/global/BreadCrumbs"), { ssr: true});

export default async function ShopPage({searchParams}:PageProps) {
  const {query} = await searchParams;
  const fetchedCategories = await getCategories();
  const uniquecategories = fetchedCategories.length > 0
    ? fetchedCategories
    : ["Living Room", "Bedroom", "Kitchen", "Office", "Decor"];
  const {hero} = await loader()
  const heroBlock = hero[0] ?? {
    text: "Shop Page",
    subtitle: "Let's design the place you've always imagined.",
    backgroundImage: {
      url: "/images/slider3.png",
      alternativeText: "",
    },
  };

  return <main className="shop-page">
              <section className="shop-hero">
                  <div className="shop-hero__content">
                      <div className="shop-hero__breadcrumbs"><Breadcrumbs/></div>
                      <h1>{heroBlock.text ?? "Shop Page"}</h1>
                      <p>{heroBlock.subtitle ?? "Let's design the place you've always imagined."}</p>
                  </div>
                  <img
                      src={getPayloadMediaURL(heroBlock.backgroundImage?.url)}
                      alt={heroBlock.backgroundImage?.alternativeText || ""}
                      className="shop-hero__image"
                  />
              </section>

                <ProductList
                  component={Card}
                  query={query}
                  uniquecategories ={uniquecategories}
                />

              <section className="shop-newsletter">
                <div className="shop-newsletter__visual shop-newsletter__visual--left" />
                <div className="shop-newsletter__content">
                  <h2>Join Our Newsletter</h2>
                  <p>Sign up for deals, new products and promotions</p>
                  <form>
                    <span className="material-symbols-outlined">mail</span>
                    <input type="email" placeholder="Email address" aria-label="Email address" />
                    <button type="submit">Signup</button>
                  </form>
                </div>
                <div className="shop-newsletter__visual shop-newsletter__visual--right" />
              </section>
         </main>;
}
