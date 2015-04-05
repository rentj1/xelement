/**
 * Created by tongjie on 15/4/5.
 */


module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                beautify: {
                    ascii_only: true
                }
            },
            buildall: {
                files: [{
                    expand:true,
                    cwd:'src',
                    src:'**/*.js',
                    dest: 'build'
                }]
            }
        },
        less: {
            buildall: {
                files: [{
                    expand:true,
                    cwd:'src',
                    src:'**/*.less',
                    dest: 'src',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            options: {
                noAdvanced: true
            },
            buildall: {
                files: [{
                    expand:true,
                    cwd:'src',
                    src:'**/*.css',
                    dest: 'build'
                }]
            }
        },
        watch: {
            allfiles: {
                files: ['src/**/*.*'],
                tasks: ['less', 'uglify','cssmin']
            }
        },

        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            dist: {
                src: ['build/xcore.js', 'build/**/*.js', '!build/XElement.js', '!build/XElement.debug.js'],
                dest: 'build/XElement.js'
            },

            debug:{
                options:{
                    stripBanners: false,
                },
                src: ['src/xcore.js', 'src/**/*.js'],
                dest: 'build/XElement.debug.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['less', 'uglify', 'cssmin', 'concat']);
};
