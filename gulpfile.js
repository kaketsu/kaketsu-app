var gulp = require('gulp');

gulp.task('default',function(){
    console.log('hello world');

    gulp.src('assets/js.es6/*')
    .pipe( gulp.dest('assets/js'));
});