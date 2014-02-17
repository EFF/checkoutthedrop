mongoose = require 'mongoose'
mongooseTypes = require 'mongoose-types'
mongooseTypes.loadTypes(mongoose)

schema =
    soundcloudUrl:
        type: mongoose.SchemaTypes.Url
        required: true
        unique : true
    requesterEmail:
        type: mongoose.SchemaTypes.Email
        required: true
        indexed: true
    requesterType:
        type: String
        required: true
    pictureUrl: mongoose.SchemaTypes.Url
    dropTime :
        type: String
        required: true
    date:
        type: Date
        default: Date.now

mongoose.model 'Drop', new mongoose.Schema(schema)
