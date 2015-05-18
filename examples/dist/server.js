'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _ash = require('./ash');

var _ash2 = _interopRequireDefault(_ash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _koaCompress = require('koa-compress');

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaRoute = require('koa-route');

var _koaRoute2 = _interopRequireDefault(_koaRoute);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var app = (0, _koa2.default)();

// import Display from './components/Display';
// import Timer from './components/Timer';

// var Renderer = new ash.Renderer();

//var componentHtml = Renderer.componentToString(new Timer());

app.use((0, _koaLogger2.default)());

function* index(next) {
  this.body = _fs2.default.readFileSync(_path2.default.join(__dirname, '../assets/index.html'), 'utf8') /*.replace('%CONTENT%', componentHtml)*/;

  yield next;
}

app.use(_koaRoute2.default.get('/', index));

function* rendering(next) {
  this.body = _fs2.default.readFileSync(_path2.default.join(__dirname, '../assets/rendering.html'), 'utf8');

  yield next;
}

app.use(_koaRoute2.default.get('/rendering', rendering));

// serve static files
app.use((0, _koaStatic2.default)(_path2.default.join(__dirname, '../public')));

// Compress
app.use((0, _koaCompress2.default)());

app.listen(8008);

console.log('Listening on port 8008...');