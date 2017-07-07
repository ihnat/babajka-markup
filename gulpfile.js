const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const stylelint = require('gulp-stylelint');
const cleanCSS = require('gulp-clean-css');

var config = {
	libsPath: 'node_modules',
   stylesPath: 'dist',
	fontsPath : 'fonts'
};

gulp.task('sass:bundle', () => gulp.src('./src/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(concatCss('bundle.css'))
	.pipe(gulp.dest(config.stylesPath))
	.pipe(concatCss('bundle.min.css'))
	.pipe(cleanCSS())
	.pipe(gulp.dest(config.stylesPath))
);

gulp.task('sass:assets', () => gulp.src('./src/index.sass')
	.pipe(sass().on('error', sass.logError))
	.pipe(concatCss('assets.min.css'))
	.pipe(cleanCSS())
	.pipe(gulp.dest(config.stylesPath))
);

gulp.task('fa:fonts', () => gulp.src(`${config.libsPath}/font-awesome/fonts/fontawesome-webfont.*`) 
	.pipe(gulp.dest(config.fontsPath))
);

gulp.task('sass:lint', () => gulp.src('./src/**/*.scss')
	.pipe(stylelint({
		reporters: [{ formatter: 'string', console: true }]
	}))
);

gulp.task('sass:watch', () => gulp.watch('./src/**/*.scss', ['sass:bundle', 'sass:lint']));

// export tasks
gulp.task('build', ['sass:bundle', 'sass:assets', 'fa:fonts']);
gulp.task('watch', ['sass:bundle', 'sass:watch']);
