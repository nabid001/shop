import React from "react";
import { client } from "@repo/sanity-config/client";

const Home = async () => {
  const query = `*[_type == "user"]`;

  const products = await client.fetch(query);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};

export default Home;
