import gulp from 'gulp';
import util from 'gulp-util';
import sass from 'gulp-ruby-sass';
import prefix from 'gulp-autoprefixer';
// import livereload from 'gulp-livereload';
// import server from 'tiny-lr';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import nodemon from 'gulp-nodemon';
import babel from 'gulp-babel';
// import uglify from 'gulp-uglify';
import cache from 'gulp-cached';

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
	return gulp.src('./src/**/*.js')
		.pipe(cache('ash-scripts'))
		.pipe(babel())
		//.pipe(uglify())
		.pipe(gulp.dest('./dist'));
});

gulp.task('scripts', ['ash-scripts', 'examples-scripts'], () => {
	return browserify('./examples/dist/app.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('./examples/public/js'));
});


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
gulp.task('default', ['scripts', 'styles'/*, 'fonts'*/], () => {
	

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
