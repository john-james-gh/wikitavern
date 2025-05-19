/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  allowedDevOrigins: ["127.0.0.1"],
  webpack: (config, {isServer}) => {
    if (isServer) {
      // Ensure the externals array exists
      config.externals = config.externals || []

      // Add the specific modules you want to externalize
      config.externals.push(
        "@azure/functions-core",
        "@opentelemetry/exporter-jaeger",
        "require-in-the-middle",
      )
    }

    return config
  },
}

export default nextConfig
