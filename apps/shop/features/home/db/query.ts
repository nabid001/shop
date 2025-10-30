export const HERO_BANNER = `*[_type == "banner" && status == "public"]{
    _id,
    _type,
    title,
    subtitle,
    description,
    "image": image.asset->url,
    primaryButton,
    secondaryButton,
}`;

export const CATEGORY = `*[_type == "category"][0..2]{
    _id,
    _type,
    name,
    slug,
    subtitle,
    actionButton,
    "image": image.asset->url
}`;

export const NEW_ARRIVAL = `*[_type == "product" && status == "public" &&  newArrival == true && dateTime(_createdAt) >= dateTime(now()) - 30 * 24 * 60 * 60] | order(_createdAt desc)[0..7]{
    _id,
    _type,
    slug,
    name,
    "price": variants.price, 
    "salePrice": variants.salePrice,
    "image": variants.image.asset,
    "category": category->name
}`;

export const FEATURED = `*[_type == "product" && status == "public" &&  featured == true][0..5]{
    _id,
    _type,
    slug,
    name,
    "price": variants.price, 
    "salePrice": variants.salePrice,
    "image": variants.image.asset->url,
    "category": category->name,
    "featured": featured
}`;

export const BESTSELLER = `*[_type == "product" && status == "public"] | order(totalSold desc)[0...7] {
    _id,
    _type,
    slug,
    name,
    "price": variants.price, 
    "salePrice": variants.salePrice,
    "image": variants.image.asset->url,
    "category": category->name,
}`;
