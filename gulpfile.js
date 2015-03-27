// Node modules
var fs = require('fs');
var vm = require('vm');
var merge = require('deeply');
var chalk = require('chalk');
var es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp');
var rjs = require('gulp-requirejs-bundler');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: 'bower_modules/requirejs/require'
        },
        include: [
            'requireLib',
            'text!components/about-tab/about.html',
            'components/nav-bar/nav-bar',
            'components/home-tab/home'

        ],
        insertRequire: ['app/startup'],
        bundles: {
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
            'release': [
                    'components/release-tab/release-tab'
            ],
            'images': [
                    'components/images-tab/images-tab'
            ],
            'tracking': [
                    'components/tracking-tab/tracking-tab'
            ],
            'admin': [
                    'components/admin-options-tab/admin-options-tab',
                    'components/admin-providers-tab/admin-providers-tab',
                    'components/admin-users-tab/admin-users-tab' 
            ],
            'user-admin': [
                    'components/user-preferences-tab/user-preferences-tab'
            ]
        }
    });

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('css', function () {
    //css
    var bootstrapCss = gulp.src('src/bower_modules/components-bootstrap/css/bootstrap.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'));
    var materialFontCss = gulp.src('src/bower_modules/bootstrap-material-design/dist/css/material-wfont.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'));
    var materialCss = gulp.src('src/bower_modules/bootstrap-material-design/dist/css/material.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'));
    var ripplesCss = gulp.src('src/bower_modules/bootstrap-material-design/dist/css/ripples.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/'));
    var appCss = gulp.src('src/css/*.css');
    var combinedCss = es.concat(bootstrapCss, materialCss, materialFontCss, ripplesCss, appCss).pipe(concat('css.css'));

    // fonts
    var bootstrapFonts = gulp.src('./src/bower_modules/components-bootstrap/fonts/*', { base: './src/bower_modules/components-bootstrap/' });
    var materialFonts = gulp.src('./src/bower_modules/bootstrap-material-design/dist/fonts/*', { base: './src/bower_modules/bootstrap-material-design/dist/' });

    return es.concat(combinedCss, bootstrapFonts, materialFonts)
        .pipe(gulp.dest('./dist/'));
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'scripts.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('./dist/**/*', { read: false })
        .pipe(clean());
});

gulp.task('default', ['html', 'js', 'css'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});
