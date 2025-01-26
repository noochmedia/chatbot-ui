const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
        },
        {
          protocol: "http",
          hostname: "127.0.0.1",
        },
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    headers: async () => {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value: `
                default-src 'self'; 
                script-src 'self' 'unsafe-inline' 'unsafe-eval'; 
                connect-src 'self' https://gygbxgpvfsvihxbmahcy.supabase.co; 
                img-src 'self' https://gygbxgpvfsvihxbmahcy.supabase.co data:; 
                frame-src 'self';
              `,
            },
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "X-Requested-With, Content-Type, Authorization",
            },
          ],
        },
      ];
    },
    experimental: {
      serverComponentsExternalPackages: ["sharp", "onnxruntime-node"],
    },
  })
);
