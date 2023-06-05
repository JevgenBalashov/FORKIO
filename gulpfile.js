import gulp from 'gulp';

// import path
import { path } from './gulp/config/path.js';

// import global plugins
import { plugins } from './gulp/config/plugins.js';

// Set variable in global object
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  gulp: gulp,
  path: path,
  plugins: plugins,
};

// Import tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { img } from './gulp/tasks/img.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';

// Watcher
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, img);
}

// create fonts
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// main tasks
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, img));

// Tasks execution script
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// Running a default task
gulp.task('default', dev);

export { dev };
export { build };
export { reset };
