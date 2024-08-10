// next.config.js
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Ajoute ici les configurations spécifiques au serveur
  },
  publicRuntimeConfig: {
    // Ajoute ici les configurations accessibles au client
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
