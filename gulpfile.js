var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var cache = require('gulp-cache');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var htmlclean = require('gulp-htmlclean');
var minifycss = require('gulp-minify-css');
var pngquant = require('imagemin-pngquant');

// 压缩css源文件(只压缩修改过的源文件)
gulp.task('generate-minify-css', function() {
  return gulp.src('./public/css/**/*.css')
    .pipe(changed('/tmp/blog/css/', {extension:'.css', hasChanged: changed.compareContents}))
    .pipe(minifycss())
    .pipe(gulp.dest('/tmp/blog/css/'))
    .pipe(debug({title: '压缩css源文件:'}));
});

// 拷贝经压缩的css源文件(只拷贝修改过的压缩源文件)
gulp.task('copy-minify-css', ['generate-minify-css'], function() {
  return gulp.src('/tmp/blog/css/**/*.css')
    .pipe(changed('./public/css/', {extension:'.css', hasChanged: changed.compareContents}))
    .pipe(gulp.dest('./public/css/'))
    .pipe(debug({title: '拷贝经压缩的css源文件:'}));
});

// 压缩js源文件(只压缩修改过的源文件),支持将ES6代码转换成ES5代码
gulp.task('generate-minify-js', function() {
  return gulp.src('./public/lib/**/*.js')
    .pipe(changed('/tmp/blog/lib/', {extension:'.js', hasChanged: changed.compareContents}))
    .pipe(babel({presets: ['es2015']}))
    .pipe(uglify())
    .pipe(gulp.dest('/tmp/blog/lib/'))
    .pipe(debug({title: '压缩js源文件:'}));
});

// 拷贝经压缩的js源文件(只拷贝修改过的压缩源文件)
gulp.task('copy-minify-js', ['generate-minify-js'], function() {
  return gulp.src('/tmp/blog/lib/**/*.js')
    .pipe(changed('./public/lib/', {extension:'.js', hasChanged: changed.compareContents}))
    .pipe(gulp.dest('./public/lib/'))
    .pipe(debug({title: '拷贝经压缩的js源文件:'}));
});

// 压缩html源文件(只压缩修改过的源文件)
gulp.task('generate-minify-html', function() {
  return gulp.src('./public/**/*.html')
    .pipe(changed('/tmp/blog/', {extension:'.html', hasChanged: changed.compareContents}))
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    }))
    .pipe(gulp.dest('/tmp/blog/'))
    .pipe(debug({title: '压缩html源文件:'}));
});

// 拷贝经压缩的html源文件(只拷贝修改过的压缩源文件)
gulp.task('copy-minify-html', ['generate-minify-html'], function() {
  return gulp.src('/tmp/blog/**/*.html')
    .pipe(changed('./public/', {extension:'.html', hasChanged: changed.compareContents}))
    .pipe(gulp.dest('./public/'))
    .pipe(debug({title: '拷贝经压缩的html源文件:'}));
});

// 压缩图片（深度压缩）
gulp.task('minify-images', function() {
  gulp.src('./public/asset/**/*.{png,jpg,gif,ico}')
    .pipe(cache(imagemin({                   //启用缓存，只压缩发生变化的图片
      progressive: true,                     //是否无损压缩jpg图片
      interlaced: false,                     //是否隔行扫描gif进行渲染
      svgoPlugins: [{removeViewBox: false}], //是否移除svg的viewbox属性
      multipass: false,                      //是否多次优化svg直到完全优化
      optimizationLevel: 5,                  //优化等级，取值范围：0-7，默认值：3
      use: [pngquant()]                      //使用pngquant深度压缩png图片的imagemin插件
    })))
    .pipe(gulp.dest('./public/asset'))
    .pipe(debug({title: '压缩图片:'}));
});

// gulp3的写法
gulp.task('minify-js', ['generate-minify-js', 'copy-minify-js']);
gulp.task('minify-css', ['generate-minify-css', 'copy-minify-css']);
gulp.task('minify-html', ['generate-minify-html', 'copy-minify-html']);
