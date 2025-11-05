import ProductCard from "@/components/card/ProductCard";
import ProductDetailsClient from "@/features/products/components/ProductDetailsClient";
import Image from "next/image";
import {
  getAllProducts,
  getProductById,
  getProducts,
  getRelatedProducts,
} from "@/features/products/db/product";
import { Suspense } from "react";
import { getCurrentUser } from "@/services/clerk";

// export async function generateStaticParams() {
//   const products = await getAllProducts();

//   return products?.map((pro: any) => ({
//     slug: pro.slug.current,
//   }));
// }

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { user } = await getCurrentUser({ allData: true });
  const slug = (await params).slug;
  const product = await getProductById(slug);

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
      <ProductDetailsClient product={product?.data!} userId={user?.id!} />

      <section className="mt-20">
        <h2 className="product-heading-text mb-7">You May Also Like</h2>

        <Suspense fallback={"loading relatedProducts..."}>
          <RelatedProducts
            slug={product.data?.category.slug.current!}
            productId={product.data?._id!}
          />
        </Suspense>
      </section>
    </section>
  );
};

export default ProductDetails;

const RelatedProducts = async ({
  slug,
  productId,
}: {
  slug: string;
  productId: string;
}) => {
  const relatedProducts = await getRelatedProducts({
    category: slug,
    id: productId,
  });

  return (
    <>
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
                isFeatured={product.featured}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
