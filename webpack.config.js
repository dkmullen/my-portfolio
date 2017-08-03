/*jshint esversion: 6 */

const path = require("path");
module.exports = {
  entry: {
    App: "./app/resources/scripts/App.js",
    Vendor: "./app/resources/scripts/Vendor.js",
  },
  output: {
    path: path.resolve(__dirname, "./app/temp/scripts"),
    filename: "[name].js"
  },
  module: {
    rules: [ // used to be loaders but is now "rules:"
      {
        loaders: "babel-loader", // need to have -loader after babel
        query: {
          presets: ["es2015"]
        },
        test: /\.js$/, // apply Babel only to js files
        exclude: /node_modules/
      }
    ]
  }
};
// This file packs up our modules and exports them into one ES5 file (w/Babel)
