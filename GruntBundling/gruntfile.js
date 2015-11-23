/// <binding BeforeBuild='build' Clean='clean' ProjectOpened='watch:bundles' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: ['bundles', 'assets.json']
        },

        uglify: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'bundles/jquery.js': ['Scripts/jquery-*.min.js'],
                    'bundles/jqueryval.js': ['Scripts/jquery.validate*.min.js'],
                    'bundles/modernizr.js': ['Scripts/modernizr-*.js'],
                    'bundles/bootstrap.js': ['Scripts/bootstrap.js', 'Scripts/respond.js'],
                    'bundles/site.js': ['Scripts/site.js']
                }
            }
        },

        cssmin: {
            options: {
                sourceMap: true
            },
            build: {
                files: {
                    'bundles/main.css': ['Content/bootstrap.css', 'Content/site.css']
                }
            }
        },

        filerev: {
            js: {
                src: [
                    'bundles/jquery.js',
                    'bundles/jqueryval.js',
                    'bundles/modernizr.js',
                    'bundles/bootstrap.js',
                    'bundles/site.js'
                ]
            },
            css: {
                src: [
                    'bundles/main.css'
                ]
            }
        },
        
        filerev_assets: {
            build: {
                options: {
                    prefix: "/",
                    prettyPrint: true
                }
            }
        },
        
        watch: {
            bundles: {
                files: ['Scripts/**/*.js', 'Content/**/*.css'],
                tasks: ['build']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-filerev-assets');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['clean', 'uglify', 'cssmin', 'filerev', 'filerev_assets']);
};
