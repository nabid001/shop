import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {media} from 'sanity-plugin-media'
import {webhooks} from 'sanity-plugin-webhooks'

const projectId = process.env.SANITY_STUDIO_SANITY_PROJECT_ID as string
const dataset = process.env.SANITY_STUDIO_SANITY_DATASET as string

export default defineConfig({
  name: 'cms',
  title: 'CMS',
  projectId: projectId,
  dataset: dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool(), visionTool(), media(), webhooks()],
})
