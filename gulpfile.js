var gulp=require('gulp');
var sass=require('gulp-sass');
var uglify=require('gulp-uglify');
var concat=require('gulp-concat');
var rename=require('gulp-rename');
var browserSync=require('browser-sync');

// 编译sass
gulp.task("compileSass",function(){
    // 查找sass文件
    gulp.src('./src/sass/*.scss')

    // 通过管道传输、编译
    .pipe(sass({outputStyle:'compact'}).on('error',sass.logError))

    // 输出到硬盘
    .pipe(gulp.dest('./src/css/'))
})

// 创建文件监听任务：文件有修改，则自动编译
gulp.task('jtSass',function(){
    // 当文件有修改，则执行complieSass任务
    gulp.watch('./src/sass/*.scss',['compileSass'])
});

// 自动刷新
gulp.task('server',function(){
    browserSync({
        // 指定端口
        port:5166,
        // 代理服务器
        // 用browserSync代理php服务器
        //  * 识别php
        //  * 自动刷新
        proxy:"http://localhost:566",

        // 监听文件修改
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
    })

    // 监听sass修改
    gulp.watch('./src/sass/*.scss',['compileSass']);
});


// 合并压缩
gulp.task('mergeJs',function(){
    // 查找要合并的js文件
    gulp.src(['./src/js/*.js','!./src/js/{all,all-min,require}.js'])
    // 合并js
    .pipe(concat('all.js'))
    // 输出到硬盘
    .pipe(gulp.dest('./src/js/'))

    // 压缩
    .pipe(uglify())

    // 重命名
    .pipe(rename({suffix:'-min'}))

    // 输出到硬盘
    .pipe(gulp.dest('./src/js/'))
});