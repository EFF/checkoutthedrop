#!/bin/sh
./node_modules/.bin/bower install && ./node_modules/.bin/grunt build && ./node_modules/.bin/coffee ./server/app.coffee
