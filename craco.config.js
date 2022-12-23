const rewireBabelLoader = require("craco-babel-loader");
const { realpathSync } = require("fs");
const { resolve } = require("path");
const Dotenv = require("dotenv-webpack");

function forceAbsolutePackage(relativePath) {
  const appDirectory = realpathSync(process.cwd());
  return resolve(appDirectory, relativePath);
}

module.exports = {
  babel: {
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  },
  plugins: [
    //This is a craco plugin: https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview
    {
      plugin: rewireBabelLoader,
      options: {
        includes: [
          // On force un absolute path car c'est requis par babel-loader
          forceAbsolutePackage("node_modules/@wagmi/core/dist"),
          forceAbsolutePackage("node_modules/wagmi/dist"),
        ],
      },
    },
  ],
  webpack: {
    alias: {},
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.plugins.push(
        new Dotenv({ systemvars: true, path: "./.env" })
      );
      // console.log("webpackConfig", env);
      const isEnvProduction = env === "production";
      const isEnvDevelopment = env === "development";
      webpackConfig.output.libraryTarget = "umd";
      webpackConfig.output.library = "NFTComponents";

      webpackConfig.output.publicPath = "";

      webpackConfig.output.filename = isEnvProduction
        ? "[name].js"
        : isEnvDevelopment && "bundle.js";
      // Turn off chunking
      webpackConfig.optimization = {};

      const miniCssPlugin = webpackConfig.plugins.find(
        ({ constructor }) => constructor.name === "MiniCssExtractPlugin"
      );
      if (miniCssPlugin) {
        miniCssPlugin.options.filename = "[name].css";
        miniCssPlugin.options.chunkFilename = "[name].css";
      }
      return webpackConfig;
    },
  },
};
