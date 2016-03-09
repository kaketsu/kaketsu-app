var gulp = require('gulp');
var babel=require('gulp-babel');
var rename = require('gulp-rename');

gulp.task('default',function(){
    console.log('hello world');
});

gulp.task('es6',()=>{
    console.log('hello es6');
})

gulp.task('babel',function(){
    return  gulp.src('assets/js.es6/*.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins : ['transform-async-to-generator','transform-class-properties','transform-function-bind','external-helpers','transform-decorators']
        }))
        .pipe(rename(function(path){
            path.basename = path.basename.replace(/\.es6$/, '');
        }))
        .pipe(gulp.dest('assets/js/'));

})