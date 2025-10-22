import SearchAndFilter from "@/features/products/components/SearchAndFilter";
import Filter from "@/features/products/components/Filter";
import ProductCard from "@/components/card/ProductCard";
import { getCategory } from "@/features/products/db/category";
import { Suspense } from "react";
import { getProducts } from "@/features/products/db/product";

type Props = {
  searchParams: Promise<{
    category: string[] | undefined;
    search: string | undefined;
    sorting: string | undefined;
    special: string[] | undefined;
  }>;
};

const Products = async ({ searchParams }: Props) => {
  const { category, search, sorting } = await searchParams;
  const categoryPromise = getCategory();
  const res = await getProducts({
    search,
    category,
    sorting,
  });

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
                    price={product.variant.price}
                    salePrice={product.variant.salePrice}
                    category={product.category.name}
                    imageUrl={product.variant.image}
                    isBestSeller={true}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default Products;
