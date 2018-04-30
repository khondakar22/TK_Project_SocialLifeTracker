
/**
 * [mongoose description]
 * @type {[type]}
 */
var mongoose = require('mongoose');
/**
 * [Schema description]
 * @type {[type]}
 */
var Schema = mongoose.Schema;
var User = require('../models/usersModel');

/**
 * [imageUploadSchema description]
 * @type {Schema}
 */
var imageUploadSchema = new Schema({
    filename:{type: String},
    originalname:{type: String },
    imageData:{type: String },
    desc: {type: String},
    user : {type: Schema.Types.ObjectId,ref:'User'},
    created: {type: Date,  default: Date.now }
});

module.exports = mongoose.model('Image', imageUploadSchema);