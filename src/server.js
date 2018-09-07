var express = require('express');
var path = require('path');
var config = require('../webpack.config.js');
var webpack = require('webpack');
var compression = require('compression');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.use(compression());

app.use(express.static('./dist'));

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use('/', function (req, res) {
  res.sendFile(path.resolve('client/index.html'));
});

var port = process.env.PORT || 3002;

app.listen(port, function (error) {
  if (error) throw error;
  console.log("Express server listening on port", port);
});
