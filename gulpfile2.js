var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');        // js压缩
var htmlmin = require('gulp-minify-html');
var usemin = require('gulp-usemin');
var clean = require('gulp-rimraf');
var sh = require('shelljs');
var ngAnnotate = require('gulp-ng-annotate');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var preprocess=require('gulp-preprocess');

var paths = {
    sass: ['./www_src/scss/**/*.scss'],
    index: ['./www_src/index.html', './www_src/css/*', './www_src/js/**/*.js'],
    font: ['./www_src/fonts/*', './www_src/lib/ionic/fonts/*'],
    image: ['./www_src/img/**'],
    template: ['./www_src/app/**/*.html']
};

gulp.task('default', ['inject']);


gulp.task('cleancss', function () {
    gulp.src('./www_src/css/*', {read: false})
        .pipe(clean({force: true}));
});

// 编译sass文件
gulp.task('sass', ['cleancss'], function (done) {
    gulp.src('./www_src/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www_src/css/'))
        .on('end', done)
});

// 压缩html文件以及html文件中的css,js文件，并将压缩后的文件copy至www目录下
// 注意：压缩control, service等文件时，必须先使用ngAnnotate，再压缩
gulp.task('indexmin', function () {
    gulp.src('./www_src/index.html')
        .pipe(usemin({
            css: [minifyCss()],
            js_lib: [ngAnnotate(), uglify()],
            js_app: [ngAnnotate(), uglify()],
            html: [htmlmin({removeComments: true, collapseWhitespace: true})]
        }))
        .pipe(gulp.dest('./www/'));
});

//压缩templates下的文件 —— 部分写法会出错
// gulp.task('templatemin', function () {
//     gulp.src('./www_src/templates/**/*.html')
//         .pipe(htmlmin({removeComments: true, collapseWhitespace: true}))
//         .pipe(gulp.dest('./www/templates'));
// });


// 清空不需要的文件
gulp.task('clean', function () {
    gulp.src('./www/*', {read: false})
        .pipe(clean({force: true}));
});

// 将js, css, img, font等拷贝到指定位置
gulp.task('copyfont', function () {
    gulp.src('./www_src/fonts/*')
        .pipe(gulp.dest('./www/fonts'));

    gulp.src('./www_src/lib/ionic/fonts/*')
        .pipe(gulp.dest('./www/lib/ionic/fonts'));

});
gulp.task('copyimage', function () {
    gulp.src('./www_src/img/**')
        .pipe(gulp.dest('./www/img'));
});
gulp.task('copytemplate', function () {
    gulp.src(['./www_src/**/*.html', '!./www_src/**/index-raw.html'])
        .pipe(gulp.dest('./www'));
});


//加载离线地图JS文件
gulp.task('copymapjs', function () {
    gulp.src('./www_src/lib/google/gmapcache/**')
        .pipe(gulp.dest('./www/lib/google/gmapcache/'));
});

//index_raw.html生成index.html
gulp.task("copyIndex",function(){
    return gulp.src("./www_src/index-raw.html")
        .pipe(preprocess({context:{}}))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("./www_src/"));
});
gulp.task("copyIndex_debug",function(){
    return gulp.src("./www_src/index-raw.html")
        .pipe(preprocess({context:{DEBUG:true}}))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("./www_src/"));
});

//注入工程js和css
function injectProcess() {
    var target = gulp.src('./www_src/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var jssources = gulp.src(['./www_src/app/*.js', './www_src/app/*/*.js', './www_src/app/*/*/*.js'], {read: false});
    var csssources = gulp.src(['./www_src/css/*.css'], {read: false});

    return target.pipe(inject(jssources, {
        transform: function (filepath, file, i, length) {
            var fs = filepath.split('/');
            return '<script src="' + fs.slice(2, fs.length).join('/') + '"></script>';
        }
    }))
        .pipe(inject(csssources, {
            transform: function (filepath, file, i, length) {
                var fs = filepath.split('/');
                return '<link href="' + fs.slice(2, fs.length).join('/') + '" rel="stylesheet">';
            }
        }))
        .pipe(gulp.dest('./www_src'))
}
gulp.task('inject',["copyIndex",'sass'],injectProcess);
gulp.task('inject_debug',["copyIndex_debug","sass"],injectProcess);

//监控——自动任务
gulp.task('watch', function () {
    watch(paths.sass, ['sass']);
    watch('./www_src/app/**', {ignoreInitial: true}, function (f) {
        if (f.event == 'changed') {
            //do nothing
        } else if (f.event == 'add' || f.event == 'unlink') {
            //add or delete
            gulp.start('inject')
        }
    });
});

//编译工程 —— 依赖于clean，需clean执行完后再执行
gulp.task('build', ['clean', 'inject'], function () {
    gulp.start('indexmin', 'copytemplate', 'copyfont', 'copyimage', 'copymapjs');
});

gulp .task("build_debug",["clean","inject_debug"],function(){
    gulp.src("./www_src/**")
    .pipe(gulp.dest("./www"));
});



gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});
