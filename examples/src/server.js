import koa from 'koa';
import ash from './ash';

import fs from 'fs';
import compress from 'koa-compress';
import logger from 'koa-logger';
import serve from 'koa-static';
import route from 'koa-route';
import path from 'path';

var app = koa();

// import Display from './components/Display';
// import Timer from './components/Timer';

// var Renderer = new ash.Renderer();

//var componentHtml = Renderer.componentToString(new Timer());

app.use(logger());


function* index(next) {
 this.body = fs.readFileSync(path.join(__dirname, '../assets/index.html'), 'utf8')/*.replace('%CONTENT%', componentHtml)*/;

 yield next;
}

app.use(route.get('/', index));

function* rendering(next) {
 this.body = fs.readFileSync(path.join(__dirname, '../assets/rendering.html'), 'utf8');

 yield next;
}

app.use(route.get('/rendering', rendering));


// serve static files
app.use(serve(path.join(__dirname, '../public')));

// Compress
app.use(compress());

app.listen(8008);

console.log('Listening on port 8008...');
