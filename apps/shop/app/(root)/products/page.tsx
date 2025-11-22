import SearchAndFilter from "@/features/products/components/SearchAndFilter";
import Filter from "@/features/products/components/Filter";
import ProductCard from "@/components/card/ProductCard";
import { getCategory } from "@/features/products/db/category";
import { Suspense } from "react";
import { getProducts } from "@/features/products/db/product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products — Luxe Store",
  description:
    "Browse our full collection of premium clothing, accessories, and lifestyle items. Filter by category, sort by trends, and discover your next favorite product.",
  keywords: [
    "all products",
    "shop products",
    "premium fashion",
    "clothing",
    "accessories",
    "luxe store collection",
  ],

  alternates: {
    canonical: "/products",
  },

  openGraph: {
    title: "All Products — Luxe Store",
    description:
      "Explore Luxe Store's full collection of premium fashion and lifestyle products. Filter and sort to find exactly what you need.",
    url: "/products",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Luxe Store Product Collection",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "All Products — Luxe Store",
    description:
      "Shop Luxe Store's full premium collection. Discover clothing, accessories, and lifestyle essentials.",
    images: ["/og/home.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "ecommerce",
};

type Props = {
  searchParams: Promise<{
    category: string[] | undefined;
    search: string | undefined;
    sorting: string | undefined;
    special: string[] | undefined;
  }>;
};

const Products = async ({ searchParams }: Props) => {
  const categoryPromise = getCategory();

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-light text-foreground mb-2 text-balance">
            All Products
          </h1>
          <p className="text-muted-foreground text-pretty">
            Discover our complete collection of premium clothing
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter categoryPromise={categoryPromise} />

        {/* Left side filter */}
        <section className="mt-8 flex flex-1 gap-5">
          <Suspense fallback={<p>Loading Categories...</p>}>
            <Filter getCategoryPromise={categoryPromise} />
          </Suspense>

          {/* Products */}
          <div className="flex-1">
            <Suspense fallback={"Product Grid..."}>
              <ProductGrid searchParams={searchParams} />
            </Suspense>
          </div>
        </section>
      </section>
    </>
  );
};

export default Products;

const ProductGrid = async ({ searchParams }: Props) => {
  const { search, category, sorting } = await searchParams;
  const res = await getProducts({
    search,
    category,
    sorting,
  });

  return (
    <>
      {!res.success && res.error === "PRODUCT_NOT_FOUND" ? (
        <p className="mt-11 text-center text-muted-foreground">
          No products found matching your criteria
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {res.data?.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              slug={product.slug.current}
              price={product.price}
              salePrice={product.salePrice}
              category={product.category.name}
              imageUrl={product.image}
              isBestSeller={true}
            />
          ))}
        </div>
      )}
    </>
  );
};
