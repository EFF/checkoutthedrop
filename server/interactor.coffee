mongoose = require 'mongoose'

class Interactor
	createDrop: (soundcloudUrl, requesterEmail, requesterType, dropTime, callback) =>
		Drop = mongoose.model 'Drop'

		# TODO: refactor this in a middleware 
		if @isUnique(soundcloudUrl)
			drop =
				soundcloudUrl : soundcloudUrl
				requesterEmail : requesterEmail
				requesterType : requesterType
				dropTime : dropTime

			Drop.create drop, callback
		else
			callback 'this song has already been suggested'

	isUnique: (soundcloudUrl) =>
		return true
		# Drop.findOne {"soundcloudUrl : #{soundcloudUrl}"} (err, person)->
		# 	return not person

module.exports = new Interactor()
