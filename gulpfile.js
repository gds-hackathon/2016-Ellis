var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build',()=>{
    return gulp.src([
        'js/**/*.js'
        ,'!js/t1.js'
        ])
    .pipe(sourcemaps.init())
    .pipe(concat('appAll.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default',['build']);