const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;

sass.compiler = require("node-sass");

const config = {
  sass: {
    src: "./assets/sass/*.scss",
    dest: "./public/css",
    style: "compressed",
    maps: "./maps"
  },

  js: {
    src: "./assets/js/*.js",
    dest: "./public/js"
  }
};

const methods = {
  sass: function(done) {
    gulp.src(config.sass.src)
      .pipe(sass({
        outputStyle: config.sass.style
      }))
      .pipe(autoprefixer())
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write(config.sass.maps))
      .pipe(gulp.dest(config.sass.dest));

    done();
  },

  uglify: function(done) {
    gulp.src(config.js.src)
      .pipe(uglify())
      .pipe(gulp.dest(config.js.dest));

    done();
  }
}

gulp.task("sass", methods.sass);
gulp.task("uglify", methods.uglify);

gulp.task("default", gulp.parallel("sass", "uglify"));
gulp.task("watch", () => {
  gulp.watch("./assets/sass/", methods.sass);
  gulp.watch("./assets/js/", methods.uglify);
});
