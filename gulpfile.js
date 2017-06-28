  // Causes node engine to run file in strict interpretation of the JS ( https://teamtreehouse.com/library/the-javascript-use-strict-statement )
'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload();


// Browser Sync

// Static server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});




// Define a task ( cmd: gulp hello )
// callback function
// gulp.task('hello', function() {
  // console.log('Hello!');
// });

// Default task ( cmd: gulp )
// Second argument(s) array are dependencies, we've added a callback function here too
// gulp.task('default', ['hello'], function(){
  // console.log('CUNTSSSSSSSSSSSSSSSSSSS');
// })

// Concatinate scripts
gulp.task('concatScripts', () => {
  // Files to be concatinated - order may be important
  // src method creates readable, in MEMORY stream of data
  return gulp.src([ // Return statement required to run tasks concurrently, needed if task will be a dependency of another task.
    'node_modules/jquery/dist/jquery.js',    
    'js/main.js'
  ])
  .pipe(maps.init())
  // .pip sends readable stream to our concat task. Also name output file.
  .pipe(concat('app.js'))
  .pipe(maps.write('.'))
  // write data to disk from readable stream. Give folder we want to write to.
  .pipe(gulp.dest('js'))
});

// Minify scripts
gulp.task('minifyScripts', ['concatScripts'], () => {
  return gulp.src('js/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('js'));
});

// Compile Sass task
gulp.task('compileSass', () => {
  return gulp.src('scss/application.scss')
  .pipe(maps.init())
  .pipe(sass())
  .pipe(autoprefixer(/*{
            browsers: ['last 2 versions']
            // cascade: false
        }*/))
  .pipe(maps.write('.')) // Relative to output directory below
  .pipe(gulp.dest('css'));
});


// //Not working yet
// gulp.task('autoPrefixer',['compileSass'], () => {
//   return gulp.src('css/application.css')
//   .pipe(autoprefixer({
//             browsers: ['last 2 versions']
//             // cascade: false
//         }))
//   .pipe(gulp.dest('css'));
// });

gulp.task('reload', ['minifyScripts', /*'autoPrefixer'*/], () => {
  browserSync.reload();
})


// Watch task
gulp.task('watchFiles', () =>{

  // Use glob pattern (can be just string or array if more than one pattern being used)
  // Pass in task to be run (in array) when files change

  gulp.watch(['scss/**/*.scss'], ['reload']);     // - Watch all sass files and recomple whan they change

  // main.js is the only js file we'll be editing
  // Split watch task so we only compile what has been changed

  gulp.watch(['js/main.js'], ['reload']);      // - Perform concatenation when main.js changes
  
  gulp.watch(['./*.html'], ['reload']);

})




// Clean operation
gulp.task('clean', () =>{
  // Globbing patterns account for .min and .map
  del(['dist', 'css/application*.css*', 'app*.js*']);
})




// Array passed in are dependencies
gulp.task('build', ['clean', 'minifyScripts', 'compileSass'], () =>{
  return gulp.src([
    // Files to be used in build
    'css/application.css',
    'js/app.min.js',
    'index.html',
    'img/**',
    'fonts/**'
  ],
  // Maintain directory structure
  {base: './'})
  // Destination for build - option on src method
  .pipe(gulp.dest('dist'));
});


gulp.task('serve', ['watchFiles']);


// Build as callback function, won't run until default task dependency (clean) has finished
gulp.task('default', ['clean'], () => {
  gulp.start('build');  // Apparently start method will change ion gulp 4?
  gulp.start('watchFiles');
  // Serve files from the root of this project
  browserSync.init({
      server: {
          baseDir: "./"
      },
      notify: false
  });
});
