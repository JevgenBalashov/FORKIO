import babel from 'gulp-babel';
// compression js
import uglify from 'gulp-uglify';
// combine js
import concat from 'gulp-concat';

export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(concat('script.min.js'))
    .pipe(
      app.plugins.if(
        app.isBuild,
        babel({
          presets: ['@babel/env'],
        })
      )
    )
    .pipe(app.plugins.if(app.isBuild, uglify()))
    .pipe(app.gulp.dest(app.path.build.js, { sourcemaps: `.` }))
    .pipe(app.plugins.browsersync.stream());
};
