import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {webhooks} from 'sanity-plugin-webhooks'

const projectId = process.env.SANITY_STUDIO_SANITY_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_SANITY_DATASET

export default defineConfig({
  name: 'cms',
  title: 'CMS',
  projectId: projectId as string,
  dataset: dataset as string,
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool(), visionTool(), webhooks()],
})
