"use server";

import { client } from "@repo/sanity-config/client";
import { heroBanner } from "../query";
export const getHeroBanner = async () => {
  try {
    const res = await client.fetch(heroBanner);

    return res;
  } catch (error) {
    console.log("Server error", error);
  }
};
