const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css")
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps")


function compile() {
    return gulp.src("assets/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch("assets/scss/**/*.scss", compile);
    gulp.watch("build/*.html").on("change", browserSync.reload);
    gulp.watch("build/imgs/*.*").on("change", browserSync.reload);
}

exports.compile = compile;
exports.watch = watch;
