const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const stylelint = require('gulp-stylelint');
const cleanCSS = require('gulp-clean-css');

const buildDir = 'build';

gulp.task('sass:compile', () => gulp.src('./src/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(gulp.dest(buildDir))
);

gulp.task('sass:dev', () => gulp.src('./src/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(concatCss('bundle.css'))
	.pipe(gulp.dest(buildDir))
);

gulp.task('sass:prod', () => gulp.src('./src/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concatCss('bundle.css'))
	.pipe(autoprefixer())
	.pipe(cleanCSS())
	.pipe(gulp.dest(buildDir))
);

gulp.task('sass:lint', () => gulp.src('./src/**/*.scss')
	.pipe(stylelint({
		reporters: [
			{formatter: 'string', console: true}
		]
	}))
);

gulp.task('sass:watch', () => gulp.watch('./src/**/*.scss', ['sass:compile', 'sass:lint']));
gulp.task('watch', ['sass:compile', 'sass:watch']);
