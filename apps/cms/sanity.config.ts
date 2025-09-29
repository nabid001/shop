import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_SANITY_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_SANITY_DATASET

export default defineConfig({
  name: 'default',
  title: 'e-commerce',

  projectId: projectId as string,
  dataset: dataset as string,

  plugins: [
    structureTool(),
    visionTool(),
    // sanityCommerce(sanityCommerceConfig),
  ],

  schema: {
    types: schemaTypes,
  },
})
