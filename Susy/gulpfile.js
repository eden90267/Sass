var gulp = require('gulp');
var compass = require('gulp-compass');

gulp.task('compass', function() {
  gulp.src('./sass/*.sass')
    .pipe(compass({
      config_file: './config/compass.rb',
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
	gulp.watch('./sass/*.sass', ['compass']);
});

gulp.task('default', ['compass', 'watch']);