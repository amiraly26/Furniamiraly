
import { Service } from "./_componnents/services/services";
import HeroSection from "./_componnents/HeroSection/customs/herosection";
import { getContent } from "./data/loaders";
import ProductScrollable from "./_componnents/ProductCardScrollable/productScrollable";
import { BundleTest } from "./_componnents/bundle/bundleTest";
import { getReviews } from "./data/loaders";
import dummyProducts from "../public/dummyData.json";
import { HomeEditorial } from "./_componnents/homeEditorial/homeEditorial";
import { ArticleProps } from "./data/types";

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
};

function normalizeProduct(product: FallbackProduct, index: number) {
  const images = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : [];

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
    images,
    featuredImage: product.featuredImage ?? images[0],
    colour: product.colour ?? product.colours?.map((name: string) => ({ name })) ?? [{ name: "default" }],
  };
}

function pickHomeProducts(products: ArticleProps[], limit = 5) {
  const preferredProductIds = [
    "ribbed-glass-accent-lamp",
    "black-round-office-table",
    "minimal-work-desk",
    "retro-steel-toaster",
    "light-beige-pillow",
  ];
  const usedImages = new Set<string>();
  const picked: ArticleProps[] = [];
  const orderedProducts = [
    ...preferredProductIds
      .map((productId) => products.find((product) => product.ProductId === productId || product.slug === productId))
      .filter(Boolean),
    ...products,
  ] as ArticleProps[];

  for (const product of orderedProducts) {
    const imageURL = product.images?.[0]?.url;

    if (!imageURL || usedImages.has(imageURL)) continue;
    if (picked.some((item) => item.documentId === product.documentId)) continue;

    usedImages.add(imageURL);
    picked.push(product);

    if (picked.length === limit) break;
  }

  return picked;
}

export default async function Home() {
 
  const { data = [] } =  await getContent('api/products') ?? {};
  const products = data.length > 0 ? data : dummyProducts.map(normalizeProduct);
  const homeProducts = pickHomeProducts(products, 5);

  const fetchReviews = async () => {
          try {
            const review = await getReviews();
            return review.data;
          } catch (err) {
            console.error("Error loading dummy reviews JSON:", err);
            return [];
          }
        };
    
        const allReviews = await fetchReviews();
  
  return(
    <>
    <HeroSection/>
    <BundleTest/>
    <ProductScrollable articles={homeProducts} allReviews={allReviews}/>
    <Service/>
    <HomeEditorial/>
    </>
  )
}
