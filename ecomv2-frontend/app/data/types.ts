export interface LinkProps{
    id: number;
    text: string;
    cta: string;
    isExternal: boolean;
}

export interface ImageProps{
    id: number;
    documentId: string;
    url: string;
    alternativeText: string;
}

export interface LogoProps{
    title: string;
    image: ImageProps[];
}

export interface ProductCategoryProps{
    id: number;
  documentId: string;
  name: string;
  image: ImageProps;
  slug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

//note: article is product
export interface ArticleProps {
  id: number;
  documentId: string;
  title: string;
  ProductId: string;
  description: string;
  images: ImageProps[];
  featuredImage: ImageProps[];
  price: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  PercentageDiscount: number;
  product_category: ProductCategoryProps[];
  Is_new: boolean;
  colours: String[];
}

export interface CategoryProps {
  id: number;
  documentId: string;
  name: string;
  image: ImageProps;
  slug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}