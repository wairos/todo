'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const browserify  = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

sass.compiler = require('node-sass');


gulp.task('scripts', gulp.parallel(compileJs));
gulp.task('js', gulp.parallel(compileJs));
gulp.task('styles', gulp.parallel(compileSass));
gulp.task('sass', gulp.parallel(compileSass));
gulp.task('watch', gulp.series(compileSass, compileJs, gulp.parallel(watchSass, watchJs)));
gulp.task('watch:sass', gulp.series(compileSass, watchSass));
gulp.task('watch:js', gulp.series(compileJs, watchJs));


function compileJs() {
    return browserify({ entries: ['./resources/js/index.js'] })
        .transform(babelify, {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./assets/js'));
}

function compileSass() {
    return gulp.src('./resources/sass/**/*.scss')
        .pipe(sass({
            includePaths: ['./node_modules']
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./assets/css'));
}

function watchJs() {
    return gulp.watch('./resources/js/**/*.js', gulp.parallel(compileJs));
}

function watchSass() {
    return gulp.watch('./resources/sass/**/*.scss', gulp.parallel(compileSass));
}
