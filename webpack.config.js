const dotenv = require(`dotenv`);
const webpack = require(`webpack`);

const path = require(`path`);
// eslint-disable-next-line no-undef
const publicPath = path.join(__dirname, `public`);

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: publicPath
  },
  devServer: {
    contentBase: publicPath,
    hot: true,
    open: true,
    port: 1337,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ],
  devtool: `source-map`,
  resolve: {
    extensions: [`.js`, `.jsx`],
  }
};

