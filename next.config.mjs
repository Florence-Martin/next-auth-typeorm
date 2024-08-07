/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-native-sqlite-storage": false,
      "@sap/hana-client/extension/Stream": false,
      mysql: false,
    };
    return config;
  },
};

export default nextConfig;
