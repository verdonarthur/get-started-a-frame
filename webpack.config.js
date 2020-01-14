const path = require('path');
const fs = require('fs')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    host: 'localhost',
    publicPath:'/dist/',
    liveReload: true,
    overlay: true,
    hot:true,
    compress: false,
    watchContentBase: true,
    http2: true,
    https:  {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem'),
      ca: fs.readFileSync('C:\\Users\\verdo\\AppData\\Local\\mkcert\\rootCA.pem'),
    },
    port: 5500
  }
};