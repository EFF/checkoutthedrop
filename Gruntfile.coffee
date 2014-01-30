path = require 'path'
module.exports = (grunt) ->
    config =
        nodemon:
            dev:
                options:
                    file: './server/app.coffee'
                    env: grunt.file.readJSON "./server/env.dev.json"
                    watchedFolders: ['server']
                    watchedExtensions: ['coffee']

    grunt.initConfig config

    grunt.loadNpmTasks 'grunt-nodemon'
    grunt.registerTask 'default', ['nodemon']
