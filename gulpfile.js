var gulp = require('gulp'),
    zip = require('gulp-zip'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html');

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('zip', function () {
    return gulp.src('dist/**/*')
        .pipe(zip('Reverse-Runner.zip'))
        .pipe(gulp.dest('.'));
});

gulp.task('build', ['html', 'js', 'css', 'zip']);
