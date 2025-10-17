// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const deployTarget = process.env.DEPLOY_TARGET || "netlify"; // "netlify" or "github"
  
  return {
    mode: argv.mode || "development",
    entry: "./src/index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "build"),
      clean: true,
      publicPath: isProduction && deployTarget === "github" ? "/Todo-List/" : "/",
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
