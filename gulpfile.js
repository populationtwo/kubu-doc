/*jslint node: true */
"use strict";

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();
var merge       = require('merge-stream');
var sequence    = require('run-sequence');


var URL = 'http://localhost:63342';

var sassPaths = [
    'assets/bower_components/normalize.scss/sass',
    'assets/bower_components/foundation-sites/scss',
    'assets/bower_components/motion-ui/src',
    'assets/bower_components/bootstrap-sass/assets/stylesheets'
];

gulp.task('sass', function () {
    return gulp.src('assets/scss/doc-style.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream({match: '**/*.css'}));

});
gulp.task('nunjucks', function () {
    // Gets .html and .nunjucks files in pages
    return gulp.src('assets/pages/**/*.+(html|nunjucks)')
    // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['assets/templates', 'assets/views']
        }))
        // output files in app folder
        .pipe(gulp.dest(''))
        .pipe(browserSync.stream());
});


// Copy task
gulp.task('copy', function () {
    // Font Awesome
    var fontAwesome = gulp.src('assets/bower_components/fontawesome/fonts/**/*.*')
        .pipe(gulp.dest('assets/fonts'));

    return merge(fontAwesome);
});

// Build task
// Runs copy then runs sass & javascript in parallel
gulp.task('build' ,function (done) {
    sequence('copy',
        ['sass', 'nunjucks'],
        done);
});

// Browsersync task
gulp.task('browser-sync', ['build'], function () {

    var files = [
        '**/*.html',
    ];

    browserSync.init(files, {
        // Proxy address
        // proxy: URL,
        server: true

        // Port #
        // port: 63342
    });
});

gulp.task('default', ['build', 'browser-sync'], function () {
    gulp.watch(['assets/scss/**/*.scss'], ['sass']);
    gulp.watch([
        'assets/pages/**/*.nunjucks',
        'assets/templates/**/*.nunjucks',
        'assets/views/**/*.nunjucks',
    ], ['nunjucks']);
});
