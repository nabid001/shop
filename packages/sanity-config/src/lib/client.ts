import { createClient } from "next-sanity";
// import { projectId, dataset, apiVersion } from "./env";

import { sanityEnv } from "@repo/env-config/env";

export const client = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: false,
});
