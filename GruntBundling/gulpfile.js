'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var mkdirp = require('mkdirp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');

gulp.task('default', ['clean'], function () {
    return gulp.start(['minify-css', 'uglify']);
});

gulp.task('clean', function () {
    return gulp.src(['bundles', 'assets.json'], { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('minify-css', function () {
    return gulp.src(['Content/bootstrap.css', 'Content/site.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('bundles'))
        .pipe(rev.manifest('./assets.json', {
            base: process.cwd(),
            merge: true
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('uglify', ['uglify:jquery', 'uglify:jqueryval', 'uglify:modernizr', 'uglify:bootstrap', 'uglify:site']);

gulp.task('uglify:jquery', bundleAndUglify('Scripts/jquery-*.min.js', 'jquery.js'));
gulp.task('uglify:jqueryval', bundleAndUglify('Scripts/jquery.validate*.min.js', 'jqueryval.js'));
gulp.task('uglify:modernizr', bundleAndUglify('Scripts/modernizr-*.js', 'modernizr.js'));
gulp.task('uglify:bootstrap', bundleAndUglify(['Scripts/bootstrap.js', 'Scripts/respond.js'], 'bootstrap.js'));
gulp.task('uglify:site', bundleAndUglify('Scripts/site.js', 'site.js'));

gulp.task('rev', ['uglify', 'minify-css'], function () {
    return gulp.src(['bundles/*'])
        .pipe(rev())
        .pipe(gulp.dest('bundles'))
        .pipe(rev.manifest('assets.json'))
        .pipe(gulp.dest('.'));
});

function bundleAndUglify(files, outputFilename) {
    return function () {
        return gulp.src(files)
            .pipe(sourcemaps.init())
            .pipe(concat(outputFilename))
            .pipe(uglify())
            .pipe(rev())
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('bundles'))
            .pipe(rev.manifest('./assets.json', {
                base: process.cwd(),
                merge: true
            }))
            .pipe(gulp.dest('.'));
    };
}
