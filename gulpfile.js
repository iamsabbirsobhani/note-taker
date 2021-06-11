const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');

// Sass Task
function scssTask(){
  return src('src/assets/scss/common.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(dest('src/assets', { sourcemaps: '.' }));
}

// Watch Task
function watchTask(){
  watch('src/assets/scss/common.scss', series(scssTask));
}

// Default Gulp task
exports.default = series(
  scssTask,
  watchTask
);

// command "gulp" to start