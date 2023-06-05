// images minification
import imagemin from 'gulp-imagemin';

export const img = () => {
  return app.gulp
    .src(app.path.src.img)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'IMAGES',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.img))
    .pipe(
      app.plugins.if(
        app.isBuild,
        imagemin({
          optimizationLevel: 5,
          progressive: true,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.img))
    .pipe(app.plugins.browsersync.stream());
};
