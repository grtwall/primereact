'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    del = require('del'),
    flatten = require('gulp-flatten');
    
gulp.task('build-css', function() {
    return gulp.src([
        'src/components/common/Common.css',
		'src/components/**/*.css'
    ])
	.pipe(concat('primereact.css'))
	.pipe(gulp.dest('resources'))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(rename('primereact.min.css'))
	.pipe(gulp.dest('resources'));
});

gulp.task('build-themes', function() {
    return gulp.src([
        'public/themes/**/*','!public/themes/soho-*/**/*'
    ])
    //.pipe(uglifycss({"uglyComments": true}))
    .pipe(gulp.dest('resources/themes'));
})

gulp.task('images', function() {
    return gulp.src(['src/components/**/images/*.png', 'src/components/**/images/*.gif'])
        .pipe(flatten())
        .pipe(gulp.dest('resources/images'));
});

gulp.task('build-exports', function() {
    return gulp.src(['exports/*.js','exports/*.d.ts'])
        .pipe(gulp.dest('./'));
});

//Building project with run sequence
gulp.task('build-resources', gulp.series('build-css','images', 'build-themes'));

        