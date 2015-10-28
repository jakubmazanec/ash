import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import babel from 'gulp-babel';
import cache from 'gulp-memory-cache';
import webpack from 'webpack-stream';
import postcss from 'gulp-postcss';
import sass from 'gulp-ruby-sass';


const JS_BABEL = 'js:babel';
const JS_EXAMPLES_BABEL = 'js:examples-babel';
const JS_EXAMPLES_WEBPACK = 'js:examples-webpack';
const CSS_EXAMPLES_SASS = 'css:examples-sass';
const WATCH_JS = 'watch:js';
const WATCH_CSS_EXAMPLES = 'watch:css-examples';
const WATCH = 'watch';
const DEFAULT = 'default';

gulp.task(JS_BABEL, () => {
	return gulp.src('./src/**/*.js', {since: cache.lastMtime(JS_BABEL)})
		.pipe(cache(JS_BABEL))
		.pipe(babel())
		.pipe(gulp.dest('./dist'));
});

gulp.task(JS_EXAMPLES_BABEL, () => {
	return gulp.src('./examples/src/**/*.js', {since: cache.lastMtime(JS_EXAMPLES_BABEL)})
		.pipe(cache(JS_EXAMPLES_BABEL))
		.pipe(babel())
		.pipe(gulp.dest('./examples/dist'));
});

gulp.task(JS_EXAMPLES_WEBPACK, () => {
	return gulp.src('./examples/dist/app.js')
		.pipe(webpack({
			output: {
				filename: 'app.js'
			},

			postcss: [
				autoprefixer({
					browsers: ['> 1%', 'last 2 versions'],
					remove: false
				})
			]
		}))
		.pipe(gulp.dest('./examples/public/js'));
});

gulp.task(CSS_EXAMPLES_SASS, () => {
	return sass('./examples/assets/sass/app.scss', {
			precision: 8,
			style: 'nested',
			require: 'compass/import-once/activate',
			trace: true,
			sourcemap: false
		})
		.pipe(postcss([autoprefixer({browsers: ['> 1%', 'last 2 versions']})]))
		.pipe(gulp.dest('./examples/public/css'));
});

gulp.task(WATCH_JS, () => {
	gulp.watch(['./src/**/*.js', './examples/src/**/*.js'], gulp.series(gulp.parallel(JS_BABEL, JS_EXAMPLES_BABEL), JS_EXAMPLES_WEBPACK));
});

gulp.task(WATCH_CSS_EXAMPLES, () => {
	gulp.watch(['./examples/assets/sass/**/*.scss'], gulp.series(CSS_EXAMPLES_SASS));
});

gulp.task(WATCH, gulp.parallel(WATCH_JS, WATCH_CSS_EXAMPLES));

gulp.task(DEFAULT, gulp.series(
		CSS_EXAMPLES_SASS,
		JS_BABEL,
		JS_EXAMPLES_BABEL,
		JS_EXAMPLES_WEBPACK,
		WATCH
));
