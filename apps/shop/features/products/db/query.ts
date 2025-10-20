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
