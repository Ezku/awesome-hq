gulp = require 'gulp'
babelify = require 'babelify'
browserify = require 'browserify'
source = require 'vinyl-source-stream'

gulp.task 'default', [
  'build'
]

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
