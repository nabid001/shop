import ProductCard from "@/components/card/ProductCard";
import ProductDetailsClient from "@/features/products/components/ProductDetailsClient";
import Image from "next/image";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
  getProductById,
  getRelatedProducts,
} from "@/features/products/db/product";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { userId } = await getCurrentUser();
  const slug = (await params).slug;
  const product = await getProductById(slug);
  const relatedProducts = await getRelatedProducts({
    category: product.data?.category.slug.current!,
    id: product.data?._id!,
  });

  if (!product.success && product.error === "PRODUCT_NOT_FOUND") {
    return (
      <div className="product-container items-center justify-center flex flex-col gap-11">
        <h1 className="text-3xl font-semibold">{product.message}</h1>
        <Image
          src={"/svgs/empty-cart-logo.svg"}
          width={350}
          height={350}
          alt="empty"
        />
      </div>
    );
  }

  return (
    <section className="product-container">
      <ProductDetailsClient product={product.data!} userId={userId!} />

      <section className="mt-20">
        <h2 className="product-heading-text mb-7">You May Also Like</h2>

        {!relatedProducts.success && relatedProducts.error ? (
          <>
            <p>{relatedProducts.message}</p>
          </>
        ) : (
          <div className="product-card">
            {relatedProducts.data?.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  slug={product.slug.current}
                  category={product.category.name}
                  price={product.variants.price}
                  salePrice={product.variants.salePrice}
                  imageUrl={product.variants.images}
                  // isBestSeller={true}
                  isNewArrival={product.newArrival}
                  // isFeatured={product.featured}
                />
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
};

export default ProductDetails;
