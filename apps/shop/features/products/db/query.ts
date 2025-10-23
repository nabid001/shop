import { TProducts } from "@/types";
import { defineQuery } from "next-sanity";

export const PRODUCT_BY_ID = (slug: string) =>
  defineQuery(`*[_type == "product" && slug.current == "${slug}" && status == "public"][0]{
    _id,
    name,
    "category": category->{
      name, 
      slug
    },
    longDescription,
    shortDescription,
    slug,
    variants[] {
      price,
      salePrice,
      "color": color->name,
      size,
      "image": image.asset->url,
      stock,
      },
    featured,
    newArrival
}`);

export const RELATED_PRODUCTS = (category: string, id: string) =>
  `*[_type == "product" && category->slug.current match "${category}" && status == "public" && _id != "${id}"]{
    _id,
    _type,
    name,
    slug,
    featured,
    newArrival,
    category->{
      name,
      slug
    },
    variants[0]{
      "images": image.asset,
      price,
      salePrice
    }
}`;

export const CATEGORY = `*[_type == "category"]{
  _id,
  name,
  slug
}`;

export const PRODUCTS = ({ search, category, sorting }: TProducts) => {
  const conditions: string[] = ['_type == "product" && status == "public"'];
  let orderQuery = "_createdAt desc";

  if (search) {
    conditions.push(`[name, category->name] match ["${search}*","${search}*"]`);
  }

  if (sorting) {
    switch (sorting) {
      case "newest":
        orderQuery = "_createdAt desc";
        break;
      case "featured":
        conditions.push(`featured == true`);
        orderQuery = "_createdAt desc";
        break;
      case "price-low":
        orderQuery = "variants[0].salePrice asc";
        break;
      case "price-high":
        orderQuery = "variants[0].salePrice desc";
        break;
    }
  }

  if (category && category.length > 0) {
    const cat = category.map((cat) => `"${cat}"`).join(", ");
    conditions.push(`category->slug.current in [${cat}]`);
  }

  const finalQuery = `*[
    ${conditions.join(" && ")}
  ] | order(${orderQuery})[0...20] {
    _id,
    _type,
    slug,
    name,
    category->{
      slug,
      name
    },
    featured,
    newArrival,
    "variant": variants[0]{
      price,
      salePrice,
      "image": image.asset
    }
  }`;

  return finalQuery;
};
