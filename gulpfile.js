var gulp = require('gulp');
var util = require('gulp-util');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var server = require('tiny-lr')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

// server app
gulp.task('server', function () {
	nodemon({
		script: './bin/app/server.js',
		nodeArgs: ['--harmony'],
		watch: ['bin/app/**/*.js'],
		delay: 2
	});
});

gulp.task('es6-app', function () {
	return gulp.src('./app/**/*.js')
		.pipe(babel({
			whitelist: ['es6.classes', 'es6.constants', 'es6.blockScoping', 'es6.arrowFunctions', 'es6.modules', 'es6.properties.shorthand', 'useStrict'],
			sourceMap: false,
			playground: true
		}))
		.pipe(gulp.dest('bin/app'));
});

gulp.task('es6-src', function () {
	return gulp.src('./src/**/*.js')
		.pipe(babel({
			whitelist: ['es6.classes', 'es6.constants', 'es6.blockScoping', 'es6.arrowFunctions', 'es6.modules', 'es6.properties.shorthand', 'useStrict'],
			sourceMap: false,
			playground: true
		}))
		//.pipe(uglify())
		.pipe(gulp.dest('bin/src'));
});

gulp.task('scripts', ['es6-app', 'es6-src'], function () {
	return browserify('./bin/app/app.js')
		.bundle()
		//.on('error', util.log)
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public/js'))
		.pipe(livereload(server));
});


// build styles
gulp.task('styles', function () {
	return sass('./assets/sass/app.scss', {
			precision: 8,
			style: 'nested',
			require: 'compass/import-once/activate',
			trace: true,
			sourcemap: false
		})
		.on('error', util.log)
		.pipe(prefix({
			browsers: ['> 1%', 'last 2 versions'],
			cascade: true
		}))
		.pipe(gulp.dest('./public/css'))
		.pipe(livereload(server));
});

// builds fonts
gulp.task('fonts', function () {
	return gulp.src(['./assets/fonts/**/*'])
		.pipe(gulp.dest('./public/fonts'));
});

// watch
gulp.task('default', ['scripts', 'styles', 'fonts'], function () {
	// listen on port 35729
	server.listen(35729, function (error) {
		if (error) {
			return console.log(error);
		}

		// Watch .scss files
		gulp.watch('./assets/sass/**/*.scss', ['styles']);

		// Watch .js files
		gulp.watch(['./app/**/*.js', './src/**/*.js'], ['scripts']);

	});
});
