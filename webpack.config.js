var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'assets/scripts/bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"',
        'API_SERVER': JSON.stringify('http://qa-gateway-1.360training.com:8080'),
        'APP_SERVER': JSON.stringify('http://qa-udp-1.360training.com:8080'),
        'CAS_SERVER': JSON.stringify('https://qa-cas.360training.com/cas'),
        'MOCKED_DATA':false,
        'ROOT_DIR':'"resources/"'
        /*
          ROOT_DIR = '"../"' OR '"resources/"'
        */
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ]
};
