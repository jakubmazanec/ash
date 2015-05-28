import gulp from 'gulp';
import util from 'gulp-util';
import sass from 'gulp-ruby-sass';
import prefix from 'gulp-autoprefixer';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import nodemon from 'gulp-nodemon';
import babel from 'gulp-babel';
import cache from 'gulp-cached';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';

// server app
gulp.task('server', () => {
	nodemon({
		script: './examples/dist/server.js',
		nodeArgs: ['--trace_opt_verbose', '--trace'],
		watch: ['examples/dist/**/*.js', 'dist/**/*.js'],
		execMap: {
			js: 'iojs'
		},
		delay: 2
	});
});

gulp.task('examples-scripts', () => {
	return gulp.src('./examples/src/**/*.js')
		.pipe(cache('examples-scripts'))
		.pipe(babel())
		.pipe(gulp.dest('./examples/dist'));
});

gulp.task('ash-scripts', () => {
	return util.env.production ? gulp.src('./src/**/*.js')
		.pipe(cache('ash-scripts'))
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('./dist')) : gulp.src('./src/**/*.js')
		.pipe(cache('ash-scripts'))
		.pipe(babel())
		.pipe(gulp.dest('./dist'));
});

gulp.task('scripts', ['ash-scripts', 'examples-scripts'], () => {
	return util.env.production ? browserify('./examples/dist/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./examples/public/js')) : browserify('./examples/dist/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./examples/public/js'));
});

/*gulp.task('scripts-tour', function () {
	return util.env.production ? browserify('./js/main.js')
		.bundle()
		.on('error', function (error) {
			console.log('Scripts-browser task:');
			console.log(error.toString());
			this.emit('end');
		})
		.pipe(source('tour_bin.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./js')) : browserify('./js/main.js')
		.bundle()
		.on('error', function (error) {
			console.log('Scripts-browser task:');
			console.log(error.toString());
			this.emit('end');
		})
		.pipe(source('tour_bin.js'))
		.pipe(gulp.dest('./js'))
});*/


/*return util.env.production ? browserify('./app/index.js')
		.transform({global: true}, 'uglifyify')
		.transform(envify(
		{
			NODE_ENV: 'production'
		}))
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public/js'))
		.pipe(livereload(server)) : browserify('./app/index.js')
		.transform(envify(
		{
			NODE_ENV: 'development'
		}))
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public/js'))
		.pipe(livereload(server));*/



// build styles
gulp.task('styles', () => {
	return sass('./examples/assets/sass/app.scss', {
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
		.pipe(gulp.dest('./examples/public/css'));
});

// builds fonts
// gulp.task('fonts', () => {
// 	return gulp.src(['./assets/fonts/**/*'])
// 		.pipe(gulp.dest('./public/fonts'));
// });

// watch
gulp.task('default', ['scripts', 'styles'], () => {
// gulp.task('default', ['scripts', 'styles', 'fonts'], () => {
	

		// Watch .scss files
		gulp.watch('./examples/assets/sass/**/*.scss', ['styles']);

		// Watch .js files
		gulp.watch(['./examples/src/**/*.js', './src/**/*.js'], ['scripts']);

});

gulp.task('node-only', ['ash-scripts', 'examples-scripts'], () => {

		// Watch .js files
		gulp.watch(['./src/**/*.js'], ['ash-scripts']);
		gulp.watch(['./examples/src/**/*.js'], ['examples-scripts']);

});
