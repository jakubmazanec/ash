"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var koa = _interopRequire(require("koa"));

var ash = _interopRequire(require("./ash"));

var fs = _interopRequire(require("fs"));

var compress = _interopRequire(require("koa-compress"));

var logger = _interopRequire(require("koa-logger"));

var serve = _interopRequire(require("koa-static"));

var route = _interopRequire(require("koa-route"));

var path = _interopRequire(require("path"));

var app = koa();

// import Display from './components/Display';
// import Timer from './components/Timer';

// var Renderer = new ash.Renderer();

//var componentHtml = Renderer.componentToString(new Timer());

app.use(logger());

function* index(next) {
  this.body = fs.readFileSync(path.join(__dirname, "../../assets/index.html"), "utf8") /*.replace('%CONTENT%', componentHtml)*/;

  yield next;
}

app.use(route.get("/", index));

function* rendering(next) {
  this.body = fs.readFileSync(path.join(__dirname, "../../assets/rendering.html"), "utf8");

  yield next;
}

app.use(route.get("/rendering", rendering));

// serve static files
app.use(serve(path.join(__dirname, "../../public")));

// Compress
app.use(compress());

app.listen(8008);

console.log("Listening on port 8008...");