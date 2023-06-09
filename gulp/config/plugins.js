// search and replace
import replace from 'gulp-replace';
// hendling errors
import plumber from 'gulp-plumber';
// output of messages and hints
import notify from 'gulp-notify';
// browser-sync
import browsersync from 'browser-sync';
// check if file is updated
import newer from 'gulp-newer';
// use IF function
import ifPlugin from 'gulp-if';


export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  if: ifPlugin,
};
