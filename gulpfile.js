var gulp = require('gulp');
var util = require('gulp-util');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var server = require('tiny-lr')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
//var esnext = require('gulp-esnext');
var es6 = require("6to5-browserify");
//var streamify = require('gulp-streamify');

var esnextOptions = 
{
	'arrowFunction': false,
	'class': true,
	'computedPropertyKeys': false,
	'defaultParams': false,
	'destructuring': false,
	'generator': false,
	'objectConcise': false,
	'objectShorthand': false,
	'rest': false,
	'spread': false,
	'templates': false,
	'regexpu': false
};


// server app
gulp.task('server', function ()
{
	nodemon(
	{
		script: './app/server.js',
		nodeArgs: ['--harmony'],
		watch: ['app/server/*.js', 'server.js']
	});
});


// build javascript
gulp.task('scripts', function ()
{
	return browserify('./app/app.js')
		.transform(es6.configure({
			whitelist: ['classes', 'letScoping'], // TODO - without letScoping classes are defined with let
			//blacklist: ['arrayComprehension', 'arrowFunctions', 'computedPropertyNames', 'constants', 'defaultParameters', 'destructuring', 'forOf', 'generatorComprehension', 'generators', /*'letScoping',*/ 'modules', 'propertyNameShorthand', 'react', 'restParameters', 'spread', 'templateLiterals', 'unicodeRegex', 'useStrict'],
			sourceMap: false,
		}))		
		.bundle()
		//.on('error', util.log)
		.pipe(source('app.js'))
		//.pipe(streamify(esnext(esnextOptions)))
		.pipe(gulp.dest('./public/js'))
		//.pipe(gulp.dest('./test'))
		.pipe(livereload(server));
});


// build styles
gulp.task('styles', function ()
{
	return gulp.src('./assets/sass/app.scss')
		.pipe(sass(
		{
			style: 'nested',
			r: 'compass/import-once/activate'
		}))
		.on('error', util.log)
		.pipe(prefix(
		{
			browsers: ['> 1%', 'last 2 versions'],
			cascade: true
		}))
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload(server));
});

// builds fonts
gulp.task('fonts', function (cb)
{
	return gulp.src(['./assets/fonts/**/*'])
		.pipe(gulp.dest('./public/fonts'));
});

// watch
gulp.task('default', ['scripts', 'styles', 'fonts'], function ()
{
	// listen on port 35729
	server.listen(35729, function (error)
	{
		if (error)
		{
			return console.log(error);
		}

		// Watch .scss files
		gulp.watch('./assets/sass/**/*.scss', ['styles']);

		// Watch .js files
		gulp.watch(['./app/**/*.js', './src/**/*.js'], ['scripts']);
	});
});