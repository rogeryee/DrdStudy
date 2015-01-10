module.exports = function(grunt) {

  var userConfig = require( './build.config.js' );

  // Project configuration.
  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),

    clean: [ 
      '<%= build_dir %>', 
      '<%= compile_dir %>'
    ],

    concat : {
      domop : {
        src: 'app/**/*.js',
        dest: 'app/main.min.js'
      }
    },


    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  };

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat']);

};