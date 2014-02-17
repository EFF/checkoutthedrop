mongoose = require 'mongoose'
require '../../server/models/drop'

describe 'Interactor', ()->
	emptyCallback = null
	_validSoundcloudUrl = 'https://soundcloud.com/angelzofficial/paradise-angels-in-the-air'
	_validRequesterEmail = 'antoine@gmail.com'
	_validRequesterType = 'producer'
	_validDropTime = '0:55'

	beforeEach ()->
		emptyCallback = jasmine.createSpy('emptyCallback')
		@interactor = require '../../server/interactor'

		@Drop = mongoose.model 'Drop'

		spyOn(@Drop, 'create').andCallFake (drop, callback) ->
			callback null

	it 'should call create once', ()->
		expected_drop =
			soundcloudUrl : _validSoundcloudUrl
			requesterEmail : _validRequesterEmail
			requesterType : _validRequesterType
			dropTime : _validDropTime

		@interactor.createDrop _validSoundcloudUrl, _validRequesterEmail, _validRequesterType, _validDropTime, emptyCallback
		arg = @Drop.create.mostRecentCall.args[0]

		expect(@Drop.create).toHaveBeenCalled()
		expect(@Drop.create.callCount).toEqual 1
		expect(arg).toEqual(expected_drop)
