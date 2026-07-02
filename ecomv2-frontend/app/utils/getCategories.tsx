import { getProdCategories } from "../data/loaders";
import { CategoryProps } from "../data/types";
import { unique } from "next/dist/build/utils";


//get catgories pass as categoryprops
export async function ProductCategories() {
  const { data } = await getProdCategories("/api/product-categories");
  return (data ?? []) as CategoryProps[];
}

// returns array of each category name
export async function getCategories() {
  const allArticles = await ProductCategories();
  const categories = allArticles.map(category => category.name).filter(Boolean);
  return categories
}

