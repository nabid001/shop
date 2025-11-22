import ProductCard from "@/components/card/ProductCard";
import ProductDetailsClient from "@/features/products/components/ProductDetailsClient";
import Image from "next/image";
import {
  getAllProducts,
  getProductById,
  getRelatedProducts,
} from "@/features/products/db/product";
import { getCurrentUser } from "@/services/getCurrentUser";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getAllProducts();

  return products?.map((pro: any) => ({
    slug: pro.slug.current,
  }));
}

export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const product = await getProductById(slug);

  // Handle 404 product not found metadata
  if (!product.success) {
    return {
      title: "Product Not Found — Luxe Store",
      description: "The product you are looking for does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const p = product.data;

  return {
    title: `${p?.name} — Luxe Store`,
    description:
      p?.shortDescription ||
      `Buy ${p?.name} from Luxe Store. Premium quality products available for fast delivery.`,

    alternates: {
      canonical: `/products/${p?.slug.current}`,
    },

    openGraph: {
      title: `${p?.name} — Luxe Store`,
      description:
        p?.shortDescription ||
        `Premium ${p?.name} now available at Luxe Store.`,
      type: "website",
      url: `/products/${p?.slug.current}`,
      images: [
        {
          url: p?.variants.image,
          width: 1200,
          height: 630,
          alt: p?.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${p?.name} — Luxe Store`,
      description: p?.shortDescription || `Check out ${p?.name} on Luxe Store.`,
      images: [p?.variants.image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

const ProductDetails = async ({ params }: Props) => {
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
