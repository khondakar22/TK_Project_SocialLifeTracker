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
 * [locationSchema description]
 * @type {Schema}
 */
var activitySchema = new Schema({
    location : { type:Object}, 
    startpoint:{type: String },
    endpoint: {type: String},
    setActivitiesID: {type: String },
    activity:{type: String },
    user : {type: Schema.Types.ObjectId,ref:'User'},    
    start : { type:Date},
    end : { type:Date }
});




module.exports = mongoose.model('Activity', activitySchema);