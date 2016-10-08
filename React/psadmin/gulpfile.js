  "use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev web server
var open = require('gulp-open');//opens a url in web browser
var browserify = require('browserify'); //Bundles JS
var reactify = require('reactify');// Transforms react jsx to js
var source = require('vinyl-source-stream');//use conventional text streams with gulp
var concat = require('gulp-concat'); //concatenates files
var lint = require('gulp-eslint');//lint js fines including jsx

var config = {
  port: 9005,
  devBaseUrl : 'http://localhost',
  paths: {
    html: './src/*.html',
    images: './src/images/*',
    js: './src/**/*.js',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist:'./dist',
    mainJS:'./src/main.js'
  }
}

//Start a local development server
gulp.task('connect',function(){
  connect.server({
    root : ['dist'],
    port : config.port,
    base : config.devBaseUrl,
    livereload : true
  });
});

gulp.task('open',['connect'],function(){
  var params = {
    uri:config.devBaseUrl + ':' + config.port + '/',
    app: 'chrome'
  };
  gulp.src('dist/index.html')
    .pipe(open(params));
});

gulp.task('html', function(){
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('js',function(){
  browserify(config.paths.mainJS)
  .transform(reactify)
  .bundle()
  .on('error',console.error.bind(console))
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(config.paths.dist+'/scripts'))
  .pipe(connect.reload());
});

gulp.task('css',function(){
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist+'/css'))
    .pipe(connect.reload());
});

gulp.task('images',function(){
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist+'/images'))
    .pipe(connect.reload());

    gulp.src('./src/favicon.ico')
     .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint',function(){
  return gulp.src(config.paths.js)
  .pipe(lint({config:'eslint.config.json'}))
  .pipe(lint.format())
});

gulp.task('watch', function(){
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js','lint']);
});

gulp.task('default',['html','js', 'css','images', 'lint','open','watch']);
