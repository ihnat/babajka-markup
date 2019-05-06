const fs = require('fs');

const log = require('fancy-log');
const cors = require('cors');

/* gulg */
const gulp = require('gulp');
const watch = require('gulp-watch');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concatCss = require('gulp-concat-css');
const stylelint = require('gulp-stylelint');
const cleanCSS = require('gulp-clean-css');
const replace = require('gulp-replace');
const ejs = require('gulp-ejs');
const htmlhint = require('gulp-htmlhint');
const plumber = require('gulp-plumber');

const { PORT, BABAJKA_LEGACY, BABAJKA_PREFIX } = process.env;

const config = {
  libsPath: 'node_modules',
  buildPath: BABAJKA_LEGACY ? 'dist-legacy' : 'dist',
  stylesPath: 'styles',
  legacyFontsPath: 'fonts',
  fontsPath: 'webfonts',
  imagesPath: 'images',
  landingPath: 'landing',
  srcPath: BABAJKA_LEGACY ? 'legacy' : 'src',
  staticPath: 'static',
  stubsPath: 'stubs',
};

const templateVariables = JSON.parse(
  fs.readFileSync(`./${config.srcPath}/templateVariables.json`, 'utf8')
);
const landingVariables = JSON.parse(fs.readFileSync(`./landing/templateVariables.json`, 'utf8'));
const teammateImageScaleOptions = 'c_scale,w_240';
const rawTeam = JSON.parse(fs.readFileSync('./data/team.json', 'utf8'));
const team = rawTeam.map(teammate => ({
  ...teammate,
  imageUrl: teammate.imageUrl.replace('upload/', `upload/${teammateImageScaleOptions}/`),
}));
const sidebarData = JSON.parse(fs.readFileSync('./data/sidebar.json', 'utf8'));

const getPrefix = () => {
  if (BABAJKA_PREFIX && BABAJKA_LEGACY) {
    return `/${BABAJKA_PREFIX}/legacy`;
  }
  if (BABAJKA_PREFIX) {
    return `/${BABAJKA_PREFIX}`;
  }
  return '';
};

const port = PORT || 3001;
const pathPrefix = getPrefix();

const allSass = [
  `${config.srcPath}/**/*.scss`,
  `${config.landingPath}/*.scss`,
  `${config.stubsPath}/*.scss`,
];
const allEjs = [
  `${config.srcPath}/**/*.ejs`,
  `${config.landingPath}/*.ejs`,
  `${config.stubsPath}/*.ejs`,
];

templateVariables.bundlePath = `${pathPrefix}/${config.staticPath}/${
  config.stylesPath
}/bundle.min.css`;
templateVariables.assetsPath = `${pathPrefix}/${config.staticPath}/${
  config.stylesPath
}/assets.min.css`;
templateVariables.normalizeCssPath = `${pathPrefix}/${config.staticPath}/${
  config.stylesPath
}/normalize.css`;
templateVariables.landingPath = `${pathPrefix}/${config.staticPath}/${
  config.stylesPath
}/landing.min.css`;
templateVariables.imagesPath = `${pathPrefix}/${config.staticPath}/${config.imagesPath}`;
templateVariables.team = team;
templateVariables.sidebarData = sidebarData;

gulp.task('sass:bundle:main', () =>
  gulp
    .src(
      [
        `${config.srcPath}/**/*.scss`,
        `${config.stubsPath}/*.scss`,
        `!${config.srcPath}/index.scss`,
      ],
      {
        base: config.srcPath,
      }
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(replace('url("/images/', 'url("../images/'))
    .pipe(concatCss('bundle.css', { rebaseUrls: false }))
    .pipe(gulp.dest(`${config.buildPath}/${config.staticPath}/${config.stylesPath}`))
    .pipe(concatCss('bundle.min.css', { rebaseUrls: false }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${config.buildPath}/${config.staticPath}/${config.stylesPath}`))
);

gulp.task('sass:bundle:landing', () =>
  gulp
    .src([`${config.landingPath}/index.scss`], {
      base: config.srcPath,
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(replace('url("/images/', 'url("../images/'))
    .pipe(concatCss('landing.css', { rebaseUrls: false }))
    .pipe(gulp.dest(`${config.buildPath}/${config.staticPath}/${config.stylesPath}`))
    .pipe(concatCss('landing.min.css', { rebaseUrls: false }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${config.buildPath}/${config.staticPath}/${config.stylesPath}`))
);

gulp.task('sass:assets', () =>
  gulp
    .src(`${config.srcPath}/index.scss`)
    .pipe(
      sass({
        includePaths: [
          'node_modules/bulma',
          'node_modules/bulma-badge/dist/css/',
          'node_modules/font-awesome/scss',
        ],
      }).on('error', sass.logError)
    )
    .pipe(concatCss('assets.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${config.buildPath}/${config.staticPath}/${config.stylesPath}`))
);

gulp.task('sass:lint', () =>
  gulp
    .src(allSass)
    .pipe(plumber())
    .pipe(
      stylelint({
        reporters: [{ formatter: 'string', console: true }],
        fix: true,
      })
    )
);

gulp.task('sass:watch', done => {
  watch(
    allSass,
    gulp.series('sass:bundle:main', 'sass:bundle:landing', 'sass:assets', 'sass:lint')
  );
  done();
});

gulp.task('css:normalize', () =>
  gulp
    .src(`${config.libsPath}/normalize.css/normalize.css`)
    .pipe(gulp.dest(`${config.buildPath}/${config.staticPath}/${config.stylesPath}`))
);

gulp.task('fa:fonts:legacy', () =>
  gulp
    .src(`${config.libsPath}/font-awesome/fonts/fontawesome-webfont.*`)
    .pipe(gulp.dest(`${config.buildPath}/${config.staticPath}/${config.legacyFontsPath}`))
);

gulp.task('fa:fonts', () =>
  gulp
    .src(`${config.libsPath}/@fortawesome/fontawesome-free/webfonts/*`)
    .pipe(gulp.dest(`${config.buildPath}/${config.staticPath}/${config.fontsPath}`))
);

gulp.task('ejs:compile', () =>
  gulp
    .src(allEjs)
    // TODO: remove `landingVariables`
    .pipe(ejs({ ...landingVariables, ...templateVariables }, {}, { ext: '.html' }).on('error', log))
    .pipe(gulp.dest(config.buildPath))
);

const lintHtml = () =>
  gulp
    .src(`${config.buildPath}/{,!(storybook)/**/}*.html`)
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter());

gulp.task('html:lint', gulp.series('ejs:compile', lintHtml));

gulp.task('static:copy', () =>
  gulp
    .src(`${config.staticPath}/**/**/*`)
    .pipe(gulp.dest(`${config.buildPath}/${config.staticPath}`))
);

gulp.task('ejs:watch', done => {
  watch(allEjs, gulp.series('html:lint'));
  done();
});

gulp.task('serve', done => {
  connect.server({
    port,
    livereload: true,
    root: config.buildPath,
    middleware: () => [cors()],
  });
  done();
});

gulp.task('livereload', done => {
  watch([
    `${config.buildPath}/**/*.html`,
    `${config.buildPath}/${config.staticPath}/${config.stylesPath}/**/*.css`,
  ]).pipe(connect.reload());
  done();
});

/* export tasks */
gulp.task(
  'build',
  gulp.parallel(
    'ejs:compile',
    'sass:bundle:main',
    'sass:bundle:landing',
    'sass:assets',
    'css:normalize',
    'fa:fonts',
    'fa:fonts:legacy',
    'static:copy'
  )
);
gulp.task('lint', gulp.parallel('sass:lint', 'html:lint'));
gulp.task(
  'watch',
  gulp.series('build', gulp.parallel('serve', 'livereload', 'lint', 'sass:watch', 'ejs:watch'))
);
