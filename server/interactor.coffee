mongoose = require 'mongoose'

class Interactor
	createDrop: (soundcloudUrl, requesterEmail, requesterType, dropTime, callback) =>
		Drop = mongoose.model 'Drop'
 
		drop =
			soundcloudUrl : soundcloudUrl
			requesterEmail : requesterEmail
			requesterType : requesterType
			dropTime : dropTime

		Drop.create drop, (err, data) =>
			if err
				callback 'This drop has already been suggested'
			else
				callback null, data
	getRandomDrop: (callback) =>
		Drop = mongoose.model 'Drop'

		Drop.count (err, count) =>
			if err
				callback err
				
			skip = Math.floor(Math.random() * count)
			Drop.findOne().skip(skip).exec(callback)	

module.exports = new Interactor()
