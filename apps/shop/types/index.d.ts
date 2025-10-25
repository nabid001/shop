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

export type VerifiedGetCartError = "USERID_REQUIRE" | "EMPTY_CART";
export type TCartProduct = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  productId: string;
  color: string;
  size: string;
  quantity: number;
  priceAtAdd: number;
  image: string;
  category: string;
  price: number;
  salePrice: number;
  slug: string;
}[];

export type TOnlyImage = {
  _id: string;
  name: string;
  slug: { _type: string; current: string };
  category: string;
  variants: {
    image: string | null;
    price: number;
    salePrice: number;
  };
}[];

export type VerifiedRemoveCartError = "USER_ID_REQUIRE" | "PRODUCT_ID_REQUIRE";

export type TGetCategory = {
  _id: string;
  name: string;
  slug: { _type: string; current: string };
}[];

export type TProducts = {
  search: string | undefined;
  sorting: string | undefined;
  category: string[] | undefined;
};

export type TProductsResult = {
  _id: string;
  name: string;
  slug: {
    _type: string;
    current: string;
  };
  category: {
    name: string;
    slug: string;
  };
  featured: boolean;
  newArrival: boolean;
  variant: {
    price: number;
    salePrice: number;
    image: string;
  };
}[];

export type VerifiedProductError = "PRODUCT_NOT_FOUND" | "VALIDATION_ERROR";

export type AddressType = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string | null;
  phone: string;
  region: string;
  city: string;
  email: string;
  zone: string;
  address: string;
  landmark: string | null;
  addressType: "home" | "office" | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};
