'use strict';

const gulp = require('gulp'),
    { series, parallel } = gulp,
    babel = require('gulp-babel'),
    // watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    webp = require('gulp-webp'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    imagemin = require('gulp-imagemin'),
    imageresize = require('gulp-image-resize');


const path = {
    build: { // пути для файлов после сборки
        html: 'build/',
        js: 'build/js/',
        style: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { // исходные файлы
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { // типы файлов для наблюдения
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
}


// dev task
const server = () => {
    return browserSync
        .init({
            server: {
                baseDir: "./build"
            },
            host: 'localhost',
            port: 9000,
            logPrefix: "frontend"
        });
}

const html = () => {
    return gulp
        .src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({ stream: true }));
}

const styles = () => {
    return gulp
        .src(path.src.style)
        .pipe(sass())
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({ stream: true }));
}

const scripts = () => {
    return gulp.src(path.src.js)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // .pipe(uglify())
        // .pipe(concat('main.min.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
}

const watch = () => {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.style, styles)
    gulp.watch(path.watch.js, scripts)
}

// dev task
exports.dev = series(
    parallel(html, styles, scripts),
    parallel(watch, server)
)




// gulp.task('webp', () =>
//     gulp.src('src/images/**/*.*')
//         .pipe(webp({ quality: 80, preset: 'photo' }))
//         .pipe(gulp.dest('./build/images/'))
// );

// gulp.task('imagemin', () =>
//     gulp.src('src/images/**/*.*')
//         .pipe(imagemin({
//             quality: 80,
//             optimizationLevel: 6
//         }))
//         .pipe(gulp.dest('./build/images/'))
// );

// gulp.task('imageresize', () =>
//     gulp.src('src/images/**/*.*')
//         .pipe(imageresize({
//             width: 768,
//             height: 432,
//             crop : false,
//             upscale : false
//         }))
//         .pipe(gulp.dest('./build/images/'))
// );
