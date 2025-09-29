import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

import {sanityEnv} from '@repo/env-config/env'

export default defineConfig({
  name: 'default',
  title: 'e-commerce',

  projectId: sanityEnv.projectId as string,
  dataset: sanityEnv.dataset as string,

  plugins: [
    structureTool(),
    visionTool(),
    // sanityCommerce(sanityCommerceConfig),
  ],

  schema: {
    types: schemaTypes,
  },
})
