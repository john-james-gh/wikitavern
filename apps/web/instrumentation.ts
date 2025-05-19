export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      const appInsights = await import("applicationinsights")
      appInsights.setup(
        "InstrumentationKey=0d425ee5-e12c-4690-a7d1-0825f1f719c1;IngestionEndpoint=https://uksouth-1.in.applicationinsights.azure.com/;LiveEndpoint=https://uksouth.livediagnostics.monitor.azure.com/;ApplicationId=6727a6fb-054c-4965-8c19-cbca2d3e8c27",
      )

      appInsights.start()
    } catch (error) {
      console.error("Failed to initialize Application Insights:", error)
    }
  }
}
