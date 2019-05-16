const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify-es").default;

sass.compiler = require("node-sass");

const config = {
  sass: {
    src: "./assets/styles/*.scss",
    dest: "./public/css",
    style: "compressed",
  },

  js: {
    src: "./assets/scripts/*.js",
    dest: "./public/js",
  },
};

const tasks = {
  sass: function(done) {
    gulp.src(config.sass.src)
      .pipe(sass({
        outputStyle: config.sass.style
      }))
      .pipe(autoprefixer())
      // .pipe(sourcemaps.init())
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.sass.dest));

    done();
  },

  uglify: function(done) {
    gulp.src(config.js.src)
      .pipe(uglify())
      .pipe(gulp.dest(config.js.dest));

    done();
  },
};

gulp.task("sass", tasks.sass);
gulp.task("uglify", tasks.uglify);

gulp.task("default", () => {
  gulp.watch("./assets/styles/", tasks.sass);
  gulp.watch("./assets/scripts/", tasks.uglify);
});
