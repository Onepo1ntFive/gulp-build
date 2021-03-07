'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
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


var path = {
    build: { // пути для файлов после сборки
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
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


// конфиг сервера
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "frontend"
};

// собираем HTML
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});


gulp.task('webp', () =>
    gulp.src('src/images/**/*.*')
        .pipe(webp({ quality: 80, preset: 'photo' }))
        .pipe(gulp.dest('./build/images/'))
);

gulp.task('imagemin', () =>
    gulp.src('src/images/**/*.*')
        .pipe(imagemin({
            quality: 80,
            optimizationLevel: 6
        }))
        .pipe(gulp.dest('./build/images/'))
);

gulp.task('imageresize', () =>
    gulp.src('src/images/**/*.*')
        .pipe(imageresize({
            width: 768,
            height: 432,
            crop : false,
            upscale : false
        }))
        .pipe(gulp.dest('./build/images/'))
);
