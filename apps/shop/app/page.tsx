import React from "react";
import { client } from "@repo/sanity-config/client";

const Home = async () => {
  const query = `*[_type == "user"]`;

  const products = await client.fetch(query);

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-10">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <h3 className="font-bold text-2xl text-sky-300">{products[0].name}</h3>
    </div>
  );
};

export default Home;
