module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['public']
    },
    concat: {
      dist: {
        src: ['js/fpga.js'],
        dest: 'public/js/fpga.js'
      }
    },
    express: {
      options: {
        script: 'index.js'
      },
      dev: {
        options: {
          args: ['dev']
        }
      },
      dist: {
        options: {
          args: ['dist']
        }
      }
    },
    jshint: {
      files: {
        src: ['js/fpga.js']
      }
    },
    sass: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          'styles/css/main.css': 'styles/sass/main.scss'
        }
      },
      dist: {
        options: {
          sourceMap: true
        },
        files: {
          'public/css/main.css': 'styles/sass/main.scss'
        }
      }
    },
    watch: {
      html: {
        files: ['index.html'],
        tasks: [],
        options: {
          livereload: 1339
        }
      },
      javascript: {
        files: ['js/fpga.js'],
        tasks: ['jshint'],
        options: {
          livereload: 1339
        }
      },
      sass: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dev'],
        options: {
          livereload: 1339
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('no-default', function () {
    console.log('Default tasks are for the bad kind of lazy programmer. For shame!')
  });

  grunt.registerTask('default', ['no-default']);
  grunt.registerTask('dev', ['express:dev', 'sass:dev', 'jshint', 'watch']);
  grunt.registerTask('dist', ['express:dist', 'clean', 'sass:dist', 'concat:dist', 'copy:dist']);
};
