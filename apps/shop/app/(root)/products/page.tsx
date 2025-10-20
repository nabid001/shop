import React from "react";

const Products = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { category } = await searchParams;
  return <div>Products: {category}</div>;
};

export default Products;
