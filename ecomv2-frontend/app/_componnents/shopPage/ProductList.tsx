import { ArticleProps } from "@/app/data/types";
import { getContent } from "@/app/data/loaders";
import { ProductListClient } from "./ProductListClient";
import { getReviews } from "@/app/data/loaders";
import dummyProducts from "@/public/dummyData.json";

interface ContentListProps {
  component: React.ComponentType<ArticleProps>;
  query?: string;
  uniquecategories:string[];
}

type FallbackCategory = string | { name?: string };

type FallbackImage = {
  url?: string;
  alternativeText?: string | null;
};

type FallbackProduct = {
  title?: string;
  name?: string;
  ProductId?: string;
  slug?: string | null;
  PercentageDiscount?: number;
  description?: string | Array<{ children: Array<{ text: string }> }>;
  images?: FallbackImage | FallbackImage[];
  featuredImage?: FallbackImage | FallbackImage[];
  colour?: Array<{ name: string }>;
  colours?: string[];
  product_category?: FallbackCategory | FallbackCategory[];
};


// Load shop products from Payload. If the CMS is empty/offline, dummyData keeps the UI usable.
async function loader(query? :string) {
  const { data } = await getContent("/api/products",query);
  const fallbackProducts = (dummyProducts as FallbackProduct[]).map(normalizeProduct).filter((product) => {
    if (!query || query === "All Rooms") return true;

    const categories = Array.isArray(product.product_category)
      ? product.product_category
      : product.product_category
        ? [product.product_category]
        : [];

    return categories.some((category) => {
      const name = typeof category === "string" ? category : category?.name;
      return name?.toLowerCase().includes(query.toLowerCase());
    });
  });
  const articles = data.length > 0 ? data : fallbackProducts;
  return {
    articles: (articles as ArticleProps[]) || [],
  };
}

// The old JSON product shape is slightly different from Payload, so this makes both shapes match.
function normalizeProduct(product: FallbackProduct, index: number) {
  const images = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : [];
  const fixedImages = images.map((image) => ({
    ...image,
    url: image.url === "/images/prodImg1.jpg" ? "/images/products/TABLE.jpg" : image.url,
  }));

  return {
    ...product,
    title: product.title ?? product.name,
    ProductId: product.ProductId ?? product.slug ?? `product-${index + 1}`,
    PercentageDiscount: product.PercentageDiscount ?? 0,
    description: Array.isArray(product.description)
      ? product.description
      : [
          {
            children: [{ text: product.description ?? "" }],
          },
        ],
    images: fixedImages,
    featuredImage: product.featuredImage ?? fixedImages[0],
    colour: product.colour ?? product.colours?.map((name: string) => ({ name })) ?? [{ name: "default" }],
  };
}

export async function ProductList({
  component,
  query,
  uniquecategories,
}: Readonly<ContentListProps>) {
  const { articles } = await loader(query);
  const fetchReviews = async () => {
        try {
          // Reviews are loaded beside products so each card can show its current rating/count.
          const review = await getReviews();
          return review.data;
        } catch (err) {
          console.error("Error loading dummy reviews JSON:", err);
          return [];
        }
      };
  
      const allReviews = await fetchReviews();
  
 return (
    <ProductListClient
      component={component}
      articles={articles}
      uniquecategories={uniquecategories}
      allReviews={allReviews}
    />
 )
}
