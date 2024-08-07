// next.config.js
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Add your server runtime config here
  },
  publicRuntimeConfig: {
    // Add your public runtime config here
  },
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
