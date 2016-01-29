var gulp = require('gulp');
var babel=require('gulp-babel');

gulp.task('default',function(){
    console.log('hello world');

    gulp.src('assets/js.es6/*')
    .pipe( gulp.dest('assets/js'));
});



gulp.task('babel', function(){
    gulp.src('src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(''));
});


gulp.task('es6',()=> {
    return (
        gulp.src("assets2/js.es6/**/*.js")
            .pipe(babel({
                presets : ['es2015'],
                plugins : ['transform-async-to-generator', 'transform-decorators', 'transform-class-properties', 'transform-function-bind','external-helpers-2']
            }))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(rename((path)=> {
                path.basename = path.basename.replace(/\.es6$/, '');
            }))
            .pipe(gulp.dest('assets2/js/'))
    )
});

gulp.task('es6_debug',()=> {
    return (
        gulp.src(["assets2/js.es6/**/*.js"])
            .pipe(sourcemaps.init())
            .pipe(babel({
                presets : ['es2015'],
                plugins : ['transform-async-to-generator', 'transform-decorators', 'transform-class-properties', 'transform-function-bind', 'external-helpers-2']
            }))
            .pipe(rename((path)=> {
                path.basename = path.basename.replace(/\.es6$/, '');
            }))
            .pipe(sourcemaps.write({
                sourceRoot : function (file) {
                    const path=file.relative.split('/');
                    path.pop();

                    return '/source/'+path.join('/');
                }
            }))
            .pipe(gulp.dest('assets2/js/'))
    )
});