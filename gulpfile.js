const { paths, config } = require('./settings');
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const logSymbols = require('log-symbols');

function devStyles() {
    const tailwindcss = require('tailwindcss');
    return src(`${paths.devCss}/**/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([tailwindcss(config.tailwindjs), require('autoprefixer')]))
        .pipe(concat({ path: 'application.css' }))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(dest('assets'));
}

function devScripts() {
    return src(`${paths.devJs}/*.js`)
        .pipe(concat({ path: 'application.js' }))
        .pipe(dest('assets'));
}

function vendorStyles() {
    return src(`${paths.vendorCss}/**/*.css`)
        .pipe(concat({ path: 'vendor.min.css' }))
        .pipe(dest('assets'));
}

function vendorScripts() {
    return src(`${paths.vendorJs}/**/*.js`)
        .pipe(concat({ path: 'vendor.min.js' }))
        .pipe(dest('assets'));
}

function watchFiles() {
    watch(`${paths.src}/**/*.liquid`, series(devStyles));
    watch([config.tailwindjs, `${paths.devCss}/**/*.scss`], series(devStyles));
    watch(`${paths.devJs}/**/*.js`, series(devScripts));
    watch(`${paths.vendorJs}/**/*.js`, series(vendorScripts));
    watch(`${paths.vendorCss}/**/*.css`, series(vendorStyles));
    console.log('\n\t' + logSymbols.info, 'Watching for Changes..\n');
}

exports.default = series(parallel(vendorStyles, vendorScripts, devStyles, devScripts), watchFiles);
