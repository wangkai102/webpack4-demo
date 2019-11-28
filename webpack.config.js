const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.[hash:4].js",
    path: path.resolve(__dirname, "./dist")
  },
  devServer: {
    contentBase: "./dist",
    port: 8080,
    compress: true, // 服务器压缩
    open: true // 自动打开浏览器
    // hot:true//热更新
  }, // 开发服务器
  module: {
    rules: [
      // 所有第三方模块的 匹配规则
      // use 代表匹配的文件 使用对应的loader进行处理
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.less/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src")
      },
      // 支持图片
      {
        test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              outputPath: "static"
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        parallel: 4
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.[hash:4].css"
    }),
    new HtmlWebpackPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      template: "./src/index.html",
      hash: true //会将打包好的bundle.js及后面hash串引入到html中
    })
  ],
};
