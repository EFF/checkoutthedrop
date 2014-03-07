mongoose = require 'mongoose'

class Interactor
	createDrop: (soundcloudUrl, requesterEmail, requesterType, dropTime, callback) =>
		Drop = mongoose.model 'Drop'

		# TODO: refactor this in a middleware 
		drop =
			soundcloudUrl : soundcloudUrl
			requesterEmail : requesterEmail
			requesterType : requesterType
			dropTime : dropTime

		Drop.create drop, (err, data) =>
			if err
				callback 'drop has already been suggested'
			else
				callback null, data

module.exports = new Interactor()
