// compiler
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
// rename css file -> name.min.css
import rename from 'gulp-rename';
// compression css
import cleanCss from 'gulp-clean-css';
// added vendor prefix
import autoprefixer from 'gulp-autoprefixer';
// group media-queries
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
  return (
    app.gulp
      .src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'SCSS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(
        // outputStyle: 'expanded' or 'compressed'
        sass({
          outputStyle: 'expanded',
        })
      )
      .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoprefixer({
            grid: true,
            overideBrowserslist: ['last 3 versions'],
            cascade: true,
          })
        )
      )
      //.pipe(app.gulp.dest(app.path.build.css)) // copy uncompresed css file
      .pipe(app.plugins.if(app.isBuild, cleanCss()))
      .pipe(
        rename({
          extname: '.min.css',
        })
      )
      .pipe(app.gulp.dest(app.path.build.css, { sourcemaps: `.` }))
      .pipe(app.plugins.browsersync.stream())
  );
};
