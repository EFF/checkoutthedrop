async = require 'async'
request = require 'request'
stylus = require 'stylus'
express = require 'express'
path = require 'path'
http = require 'http'
nib = require 'nib'

publicDirectory = path.join __dirname, '../client'
stylusSource = path.join __dirname, '/views/stylesheets/'
stylusDestination = path.join __dirname, '../client/stylesheets/'

compileStylus = (str, path)->
    return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib())
        .import('nib')

app = express()

app.configure () ->
    app.use express.static(publicDirectory)
    app.set 'views', __dirname + '/views'
    app.set 'view engine', 'jade'

    app.use express.logger('dev')

    app.use stylus.middleware({src : stylusSource, dest: stylusDestination, compile : compileStylus})
    app.use express.static(publicDirectory)

    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use app.router

app.get '/', (req, res) ->
    res.render 'index'

port = process.env.PORT || 3000

http.createServer(app).listen port, () ->
    console.log 'server waiting for requests...', port

module.exports = app
