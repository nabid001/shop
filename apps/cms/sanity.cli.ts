import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_SANITY_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_SANITY_DATASET

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
})
