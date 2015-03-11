require('dotenv').load()

gulp = require 'gulp'
babelify = require 'babelify'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
flow = require 'gulp-flowtype'

gulp.task 'default', [
  'build'
]

gulp.task 'flow', ->
  gulp.src('./js/**/*.js')
    .pipe(flow {
      all: true
      weak: true
      abort: false
    })

gulp.task 'build', ->
  browserify(
    entries: './js/app.js'
    debug: true
  )
  .transform(babelify)
  .bundle()
  .pipe(source('awesome-hq.js'))
  .pipe(gulp.dest('./dist'))

gulp.task 'watch', ->
  gulp.watch './js/**/*.js', [
    'build'
  ]
