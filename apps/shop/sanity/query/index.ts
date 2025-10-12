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

export const CATEGORY = `*[_type == "category"]{
        _id,
        name,
        subtitle,
        actionButton,
        "image": image.asset->url
}`;

export const NEW_ARRIVAL = `*[_type == "product" && status == "public" &&  newArrival == true && dateTime(_createdAt) >= dateTime(now()) - 30 * 24 * 60 * 60] | order(_createdAt desc)[0..7]{
        _id,
        _type,
        name,
        "price": variants[0].price, 
        "salePrice": variants[0].salePrice,
        "image": variants[0]{
        "url": image.asset
        },
        "category": category->name
}`;

export const FEATURED = `*[_type == "product" && status == "public" &&  featured == true][0..5]{
        _id,
        _type,
        name,
        "price": variants[0].price, 
        "salePrice": variants[0].salePrice,
        "image": variants[0]{
        "url": image.asset
        },
        "category": category->name,
        "featured": featured
}`;

export const BESTSELLER = `*[_type == "product" && status == "public"] | order(totalSold desc)[0...7] {
        _id,
        _type,
        name,
        "price": variants[0].price, 
        "salePrice": variants[0].salePrice,
        "image": variants[0]{
        "url": image.asset
        },
        "category": category->name,
}`;
