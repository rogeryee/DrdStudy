/*global module, require */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'less': {
            options: {
                compress: true,
                optimization:true
            },
            files: {
                expand: true,
                flatten: true,
                cwd: 'Content/custom/views',
                src: ['{,*/}*.less'],
                dest: 'Content/custom/views/tmp',
                ext: '.css'
            }
        },

        'cssmin': {
            minify: {
                expand: true,        // 启用下面的选项
                cwd: 'Content/custom/views/tmp',    // 指定待压缩的文件路径
                src: ['*.css', '!*.min.css'],    // 匹配相对于cwd目录下的所有css文件(排除.min.css文件)
                dest: 'Content/custom/views/tmp',    // 生成的压缩文件存放的路径
                ext: '.min.css'        // 生成的文件都使用.min.css替换原有扩展名，生成文件存放于dest指定的目录中
            }
        },

        'concat': {
            dist: {
                src: ['Content/custom/views/**/*.less'],
                dest: 'Content/custom/views/custom.min.less'
            }
        },

        'requirejs': {
            compile: {
                options: {
                    baseUrl: './src/app',
                    //out : './build/main.js',
                    dir : './build/app',
                    modules : [
                        {
                            name:'main',
                            include: ['viewmodels/home',
                                    'viewmodels/shell',
                                    'viewmodels/about/about',
                                    'viewmodels/ko/observableSample']
                        }
                    ],
                    mainConfigFile: './src/app/main.js',
                    keepBuildDir: true,
                    paths: {
                        jquery:'empty:',
                        durandal : 'empty:',
                        plugins : 'empty:',
                        transitions : 'empty:',
                        knockout : 'empty:',
                        text : 'empty'
                    }
                }
            }
        },
        copy:{
            js : {
                src:'**',
                dest:'./build/lib',
                expand:true,
                cwd:'./src/lib'
            },
            css : {
                src:'**',
                dest:'./build/css',
                expand:true,
                cwd : './src/css'
            },
            html : {
                src:'*.html',
                dest:'./build/',
                expand:true,
                cwd : 'src/'
            },
        },
        clean: {
            beforeBuild: ['./build'],
            afterBuild: ['./build/app/viewmodels', './build/app/build.txt'],
            options: {
                force:true
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['clean:beforeBuild', 'requirejs','copy:js','copy:css','copy:html','clean:afterBuild']);


};