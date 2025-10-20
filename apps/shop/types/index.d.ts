export type THeroBanner = {
  _id: string;
  _type: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryButton: {
    name: string;
    url: string;
  };
  secondaryButton: {
    name: string;
    url: string;
  };
}[];

export type TCategory = {
  _id: string;
  _type: string;
  slug: {
    _type: "slug";
    current: "shirts";
  };
  name: string;
  subtitle: string;
  actionButton: {
    name: string;
    url: string;
  };
  image: string;
}[];

export type TNewArrival = {
  _id: string;
  _type: string;
  slug: {
    _type: "slug";
    current: "shirts";
  };
  name: string;
  price: number;
  salePrice: number;
  image: {
    url: string;
  };
  category: string;
}[];

export type TFeatured = {
  _id: string;
  _type: string;
  slug: {
    _type: string;
    current: string;
  };
  name: string;
  price: number;
  salePrice: number;
  image: {
    url: string;
  };
  category: string;
  featured: boolean;
}[];

export type TBestseller = {
  _id: string;
  _type: string;
  slug: {
    _type: string;
    current: string;
  };
  name: string;
  price: number;
  salePrice: number;
  image: {
    url: string;
  };
  category: string;
}[];

export type TProductById = {
  _id: string;
  category: {
    name: string;
    slug: {
      _type: string;
      current: string;
    };
  };
  featured: boolean;
  longDescription: {
    _key: string;
    _type: "block";
    children: {
      _key: string;
      _type: "span";
      marks: string[];
      text: string;
    }[];
    markDefs: any[];
    style: string;
  }[];
  name: string;
  newArrival: boolean;
  shortDescription: {
    _key: string;
    _type: "block";
    children: {
      _key: string;
      _type: "span";
      marks: string[];
      text: string;
    }[];
    markDefs: any[];
    style: string;
  }[];
  slug: {
    _type: "slug";
    current: string;
  };
  variants: {
    color: string;
    image: string;
    price: number;
    salePrice: number;
    size: string[];
    stock: number;
  }[];
};

export type TAddToCart = {
  userId: string;
  productId: string;
  color: string;
  size: string;
  quantity: number;
  priceAtAdd: number;
};

export type Response<E, T = void> = {
  message: string;
  error?: E;
  success: boolean;
  data?: T;
};

export type TRelatedProduct = {
  _id: string;
  _type: "product";
  name: string;
  slug: {
    current: string;
  };
  featured: boolean;
  newArrival: boolean;
  category: {
    name: string;
    slug: {
      current: string;
    };
  };
  variants: {
    images: string;
    price: number;
    salePrice: number;
  };
}[];

export type VeriFiedError =
  | "VALIDATION_ERROR"
  | "PRODUCT_ALREADY_IN_CART"
  | "DRIZZLE_ERROR";

export type VerifiedRelatedProductError =
  | "CATEGORY_REQUIRED"
  | "PRODUCT_NOT_FOUND";

export type VerifiedProductByIdError = "SLUG_REQUIRE" | "PRODUCT_NOT_FOUND";
