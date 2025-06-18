// next.config.ts
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false, // Disables the build activity indicator
    // You can also set devIndicators to false to disable all dev indicators
    // devIndicators: false,
  },
};
module.exports = nextConfig;