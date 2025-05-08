import {defineCliConfig} from "sanity/cli"

export default defineCliConfig({
  studioHost: "wikitavern",
  api: {
    projectId: "j9ou61ca",
    dataset: "production",
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: false,
})
