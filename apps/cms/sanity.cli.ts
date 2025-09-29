import {defineCliConfig} from 'sanity/cli'
import {sanityEnv} from '@repo/env-config/env'

export default defineCliConfig({
  api: {
    projectId: sanityEnv.projectId,
    dataset: sanityEnv.dataset,
  },
  deployment: {
    autoUpdates: true,
  },
})
