import qs from "qs";
import { GetPayloadURL } from "../utils/get-payload-url";
import { fetchAPI } from "../utils/fetch-api";


const BASE_URL = GetPayloadURL()

//gets hero banner content for shop page
const globalSettingsQuery = qs.stringify({
  where: {
    slug: {
      equals: "shop-page",
    },
  },
  depth: 2,
  limit: 1,
})

export async function getShopPage() {
    const path="/api/pages";
    const url = new URL(path, BASE_URL)
    url.search = globalSettingsQuery;
    return fetchAPI(url.href, { method: "GET" });
}

//gets all products
export async function getContent(path: string,query?: string) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    ...(query && query !== "All Rooms" && {
      where: {
        "product_category.name": {
          contains: query,
        },
      },
    }),
    depth: 2,
    limit: 100,
  });

  return fetchAPI(url.href, { method: "GET" });
}

//gets all product categories
export async function getProdCategories(path:string) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    depth: 1,
    limit: 100,
  });
  return fetchAPI(url.href, {method: "GET"});
}

export async function getNewArticles(plimit?: number) {
  const url = new URL("/api/products/", BASE_URL);
  url.search=  qs.stringify({
    where: {
      createdAt: {
        greater_than: "2025-10-01"
      }
    },
    depth: 2,
    ...(plimit && {
      limit: plimit,
      page: 1
    })
  });

  return fetchAPI(url.href, {method : "GET"})
}

//gets all reviews
export async function getReviews(){
  const url = new URL('/api/review-webs', BASE_URL);
  const query = qs.stringify({
    depth: 2,
    limit: 100,
  })

  url.search = query;
  return fetchAPI(url.href, {method: 'GET'})
}
