var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        // expanded, compressed, nested, compact
        .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
    gulp.start('sass');
    gulp.watch('scss/**/*.scss', ['sass']);
});