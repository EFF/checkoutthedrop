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
                    {expand: true, cwd: './client',src: ['lib/**/*', 'images/*'], dest: 'build'}
                ]
        uglify:
            build:
                files: {'./build/script/app.min.js' : ['./client/javascripts/**/*.js']}

    grunt.initConfig config

    grunt.loadNpmTasks 'grunt-nodemon'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-copy'

    grunt.registerTask 'default', ['nodemon']

    grunt.registerTask 'build', ['copy', 'uglify']
