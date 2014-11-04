var koa = require('koa');

//var Promise = require('bluebird');

//var MongoDB = require('mongodb');

var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var path = require('path');

var app = koa();


// promisosfy mongo
/*Promise.promisifyAll(MongoDB.Collection.prototype);
Promise.promisifyAll(MongoDB.MongoClient);*/

// Connect to the db
/*MongoDB.MongoClient.connect('mongodb://localhost:27017/fooDB', function (err, db)
{
	console.log('Connected to db!');

	console.log(err);

	db.createCollection('test', function(err, collection)
	{
		console.log(err);
	});

	// db.createCollectionAsync('test').then(function (collection)
	// {
	// 	console.log('ok!');
	// }, function (error)
	// {
	// 	console.log(error);
	// });
});*/


/*, function(err, db) {
  if(err) { return console.dir(err); }

  db.collection('test', function(err, collection) {});

  db.collection('test', {w:1}, function(err, collection) {});

  db.createCollection('test', function(err, collection) {});

  db.createCollection('test', {w:1}, function(err, collection) {});

});

console.log(MongoDB.MongoClient);*/


app.use(logger());

/*app.use(route.get('/', index));
app.use(route.get('/about', about));

function *index() {
 this.body = "<h1>Hello! This is my home page!</h1>";
}

function *about() {
 this.body = "<h2>My name is Adam and I like JavaScript</h2>";
}*/

// serve static files
app.use(serve(path.join(__dirname, '../public')));

// Compress
app.use(compress());

app.listen(8008);
console.log('Listening on port 8008...');