/**
 * Created by wangkehan on 15/12/25.
 */
'use strict';

//start ENV
const CONFIG= require('./gulp-config');
const DEBUG=CONFIG.DEBUG;
const RELEASE=!DEBUG;

const COMMON_SRC_DIR='../resource-common';
const SRC_DIR='resource';
const DEST_DIR='web/resource';
const LIB_SRC_DIR='../resource-lib';
const LIB_DEST_DIR='web/lib';

const ignore_path=[
    `!${COMMON_SRC_DIR}/**/ignore/**/*`,`!${COMMON_SRC_DIR}/**/ignore`,
    `!${SRC_DIR}/**/ignore/**/*`,`!${SRC_DIR}/**/ignore`,
];

const scss_path=[
    `${SRC_DIR}/**/*.scss`,`${COMMON_SRC_DIR}/**/*.scss`
].concat(ignore_path);
const js_path=[
    `${SRC_DIR}/**/*.js`,`${COMMON_SRC_DIR}/**/*.js`
].concat(ignore_path);
const other_path=[
    `${SRC_DIR}/**/*`,`!${SRC_DIR}/**/*.scss`,`!${SRC_DIR}/**/*.js`,
    `${COMMON_SRC_DIR}/**/*`,`!${COMMON_SRC_DIR}/**/*.scss`,`!${COMMON_SRC_DIR}/**/*.js`
].concat(ignore_path);
//end ENV

const gulp=require('gulp');
const sass=require('gulp-sass');
const babel=require('gulp-babel');
const clean=require('gulp-clean');
const sourcemaps=require('gulp-sourcemaps');
const uglify=require('gulp-uglify');
const nop=require('gulp-nop');
const watch=require('gulp-watch');
const util=require('gulp-util');

//resource
gulp.task('scss',()=> {
    return (
        gulp.src(scss_path)
            .pipe(DEBUG ? sourcemaps.init() : nop())
            .pipe(sass({ outputStyle : 'compressed' }).on('error', sass.logError))
            .pipe(DEBUG ? sourcemaps.write() : nop())
            .pipe(gulp.dest(`${DEST_DIR}/`))
    );
});
gulp.task('es6',()=> {
    return (
        gulp.src(js_path)
            .pipe(DEBUG ? sourcemaps.init() : nop())
            .pipe(babel({
                presets : ['es2015'],
                plugins : ['transform-async-to-generator', 'transform-decorators', 'transform-class-properties', 'transform-function-bind', 'external-helpers-2','transform-es3-member-expression-literals','transform-es3-property-literals']
            }))
            .on('error',function (e){util.log(`${e.message}\n${e.stack}`);this.emit('end')})
            .pipe(DEBUG ? nop() : uglify())
            .pipe(DEBUG ? sourcemaps.write() : nop())
            .pipe(gulp.dest(`${DEST_DIR}/`))
    )

});
gulp.task('copy',()=>{
    return (
        gulp.src(other_path)
            .pipe(gulp.dest(`${DEST_DIR}/`))
    )
});
gulp.task('clean',()=>{
    return gulp.src(`${DEST_DIR}/`,{read:false}).pipe(clean());
});
gulp.task('build',['clean'],()=>{
    return gulp.start(['scss','es6','copy']);
});

//lib
gulp.task('clean-lib',()=>{
    return gulp.src(`${LIB_DEST_DIR}`,{read:false}).pipe(clean());
});
gulp.task('copy-lib',()=>{
    return gulp.src(`${LIB_SRC_DIR}/**/*`)
        .pipe(babel({
            plugins:['transform-es3-member-expression-literals','transform-es3-property-literals']
        }))
        .pipe(DEBUG ? nop() : uglify())
        .pipe(gulp.dest(`${LIB_DEST_DIR}/`));
});
gulp.task('build-lib',['clean-lib'],()=>{
    return gulp.start('copy-lib');
});


//default build
gulp.task('default',()=>{
    return gulp.start(['build','build-lib']);
});

//watch
gulp.task('watch',()=>{
    watch(scss_path,()=>{ gulp.start('scss') });
    watch(js_path,()=>{ gulp.start('es6') });
    watch(other_path,()=>{ gulp.start('copy') });
    watch(`${LIB_SRC_DIR}/**/*`,()=>{ gulp.start('copy-lib') });
});


