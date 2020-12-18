import path from "path";
import webpack from 'webpack'
export default  {
    devtool:"eval-source-map",
  mode:"development",
  entry: ['webpack-hot-middleware/client',path.join(__dirname,"client/index.js")],
  output: {
    filename:"bundle.js",
    path: "/",
    publicPath:"/"
  },
  plugins:[
    new webpack.NoEmitOnErrorsPlugin (),
   // new webpack.optimize.OcurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
         {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
        ]
       }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  }
};

