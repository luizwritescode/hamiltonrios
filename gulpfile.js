import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';


gulp.task('make', function(){
    return browserify({
      entries: [
        'public/scripts/main.js'
      ],
      outfile: 'public/scripts/bundle.js'
    })
    .transform('babelify', 
    {
        presets: ["@babel/preset-env"], 
        sourceMaps: true, 
        global: true, 
        ignore: [/\/node_modules\//]
    })
    .bundle()
  });