'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      options: {
        sourceMap: true
      },
      dist: {
        src: 'zondb.js',
        dest: 'zondb-min.js'
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};