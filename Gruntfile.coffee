path = require 'path'
module.exports = (grunt) ->
    config =
        nodemon:
            dev:
                options:
                    file: './server/app.coffee'
                    watchedFolders: ['server']
                    watchedExtensions: ['coffee', 'styl']
        copy:
            main:
                files: [
                    {expand: true, cwd: './client',src: ['lib/**/*', 'images/**'], dest: 'build'}
                ]
        uglify:
            build:
                files: {'./build/script/app.min.js' : ['./client/javascripts/**/*.js']}
        imagemin:
            default:
                options:
                    optimizationLevel: 4
                files: [{expand: true, cwd: './client',src: ['images/*'], dest: 'build'}]
        shell:
            mongo:
                command: 'mongod'
        concurrent:
            target: ['shell', 'nodemon']

    grunt.initConfig config

    grunt.loadNpmTasks 'grunt-shell'
    grunt.loadNpmTasks 'grunt-nodemon'
    grunt.loadNpmTasks 'grunt-concurrent'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-imagemin'

    grunt.registerTask 'default', ['concurrent:target']
    grunt.registerTask 'server', ['nodemon']

    grunt.registerTask 'build', ['copy', 'uglify']
