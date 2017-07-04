const gulp = require('gulp');
const sass = require('gulp-sass');
const concatCss = require('gulp-concat-css');

const buildDir = 'build';

gulp.task('sass', () => gulp.src('./src/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(buildDir))
);

gulp.task('sass:dev', () => gulp.src('./src/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(concatCss('bundle.css'))
	.pipe(gulp.dest(buildDir))
);

gulp.task('sass:prod', () => gulp.src('./src/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(concatCss('bundle.css'))
	.pipe(gulp.dest(buildDir))
);

gulp.task('sass:watch', () => gulp.watch('./src/**/*.scss', ['sass']));

gulp.task('watch', ['sass', 'sass:watch']);
gulp.task('build', ['sass', 'sass:prod']);
gulp.task('build-dev', ['sass', 'sass:dev']);