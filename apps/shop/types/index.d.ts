import { ProductTable, UserRole } from "@/drizzle/schema";

export interface IUserCreate {
  clerkId: string;
  username: string;
  email: string;
  name: string;
  picture: string;
  role: UserRole;
}

export interface ProductTableData {
  id: string;
  name: string;
  price: number;
  stock: number | null;
  status: "private" | "public";
  totalOrdered: number | null;
  author: {
    id: string;
    clerkId: string;
  };
}

export type ProductTable = typeof ProductTable.$inferSelect;
export interface ProductsTypes extends ProductTable {
  productCategories: {
    category: {
      id: string;
      name: string;
    };
    categoryId: string;
    productId: string;
  }[];
}

export interface ProductDataProps {
  id?: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  mainImage: string;
  status: "private" | "public";
  price: number;
  category: string[];
  multiImages: string[] | undefined;
  stock: number | undefined;
  color: string[] | undefined;
  size: string[] | undefined;
  author: string | null;
  salePrice: number;
  flag: "none" | "featured";
}

type ProductErrorType =
  | "id-require"
  | "invalid-id"
  | "product-deleted"
  | "server-error"
  | "none";

interface ProductData {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  mainImage: string;
  multiImages: string[] | null;
  size: string[] | null;
  price: number;
  stock: number | null;
  color: string[] | null;
}

interface ProductSuccessResponse {
  success: true;
  data: ProductData;
  message: true;
  errorType: "none";
}

interface ProductErrorResponse {
  success: false;
  message: string;
  errorType: Exclude<ProductErrorType, "none">;
}

type GetProductByIdResponse = ProductSuccessResponse | ProductErrorResponse;
export type AddToCartError =
  | { code: "MISSING_ID"; message: string }
  | { code: "MISSING_USERID"; message: string }
  | {
      code: "ZOD_FAILED_TO_PARSE";
      message: string;
    };

// CreateAddress
export type CreateAddress = {
  fullName: string;
  phone: string;
  region: string;
  city: string;
  zone: string;
  address: string;
  landmark?: string;
  addressType: "home" | "office";
  userId: string;
};

export type CreateAddressProps = {
  userId: string;
  values: CreateAddress;
};

export type r = {
  success: boolean;
  message: string;
  errorType?:
    | "missing-userid"
    | "zod-failed-to-parse"
    | "server-error"
    | "missing-address-id";
};
