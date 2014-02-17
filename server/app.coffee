async = require 'async'
request = require 'request'
stylus = require 'stylus'
express = require 'express'
path = require 'path'
http = require 'http'
nib = require 'nib'
mongoose = require 'mongoose'
interactor = require './interactor'

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

mongoose.connect 'mongodb://localhost:27017/test'
require './models/drop'

app.configure () ->
    app.use express.static(publicDirectory)
    app.set 'views', __dirname + '/views'
    app.set 'view engine', 'jade'

    app.use express.logger('dev')
    app.use stylus.middleware({src : stylusSource, dest: stylusDestination, compile : compileStylus})
    app.use express.static(publicDirectory)
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.disable 'x-powered-by'

    app.use app.router

app.get '/', (req, res) ->
    res.render 'index'

app.post '/drop', (req, res) ->
    body = req.body
    interactor.createDrop body.soundcloudUrl, body.requesterEmail, body.requesterType, body.dropTime, (err, data)->
        if err
            res.json 500, err
        else
            res.send data

port = process.env.PORT || 3000

http.createServer(app).listen port, () ->
    console.log 'server waiting for requests...', port

module.exports = app
