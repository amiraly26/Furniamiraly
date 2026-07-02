import { PageRenderer } from "@/app/_componnents/blocks/ProductPageRenderer";
import { getContent, getReviews } from "@/app/data/loaders";
import { ArticleProps } from "@/app/data/types";
import dummyProducts from "@/public/dummyData.json";

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
  stock?: number;
  measurement?: string;
};

type RawReview = {
  name?: string;
  Comment?: string;
  rating: number;
  Date?: string;
  productId?: {
    id?: number | string;
  };
};

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
    stock: product.stock ?? 0,
    measurement: product.measurement ?? "Standard size",
  };
}

export default async function  page({ params }) {
    const  slug  = (await params).slug;

    const slugStr = Array.isArray(slug) ? slug[0] : slug;

    async function loader(query? :string) {
      const { data } = await getContent("/api/products",query);
      const products = data.length > 0 ? data : dummyProducts.map(normalizeProduct);
      return {
        articles: (products as ArticleProps[]) || [],
      };
    }
    const fetchData = async () => {
      try {
          const res=await loader();

          //Searching for the slug name in the url
          const match = res.articles.filter(item =>
            item.ProductId === slugStr || item.slug === slugStr
          );
          return match;

        } catch (err) {
            console.error("Error loading dummy product JSON:", err);
        }
    };

    const fetchReviews = async () => {
      try {
        const review = await getReviews();
        return review.data;
      } catch (err) {
        console.error("Error loading dummy reviews JSON:", err);
        return [];
      }
    };
    const dummyProduct = await fetchData();

    const allReviews = await fetchReviews();
    if (!dummyProduct?.[0])
      return <main className="relative top-[105px] min-h-[60vh] px-8 py-20 text-center"><h1>Product not found</h1></main>;

    const selectedProduct = dummyProduct[0];
    const { articles } = await loader();
    const relatedProducts = articles
      .filter((item) => item.documentId !== selectedProduct.documentId)
      .filter((item, index, all) => {
        const imageURL = item.images?.[0]?.url || item.featuredImage?.url;
        return imageURL && all.findIndex((candidate) => {
          const candidateURL = candidate.images?.[0]?.url || candidate.featuredImage?.url;
          return candidateURL === imageURL;
        }) === index;
      })
      .slice(0, 4);

   const productReviews = (allReviews as RawReview[])
      .filter((r) => r.productId?.id === selectedProduct.id)
      .map((r) => ({
        reviewerName: r.name,
        comment: r.Comment,
        rating: r.rating,
        date: r.Date,
      }));
      
    const avgRating =
    productReviews.length === 0 ? 0
    :Math.round(productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length);

    return(
      <PageRenderer
        product={selectedProduct}
        reviews={productReviews}
        productId={selectedProduct.documentId}
        name={selectedProduct.title}
        avgRating={avgRating}
        relatedProducts={relatedProducts}
      />
    );
}
