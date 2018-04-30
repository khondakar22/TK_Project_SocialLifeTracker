/**
 * [express description]
 * @type {[type]}
 */
const express = require('express');
/**
 * [router description]
 * @type {[type]}
 */
const router = express.Router();

/**
 * [path description]
 * @type {[type]}
 */
const path = require("path");
/**
 * [fs description]
 * @type {[type]}
 */
const fs = require("fs");
/**
 * [del description]
 * @type {[type]}
 */
const del = require("del");

/**
 * [multer description]
 * @type {[type]}
 */
const multer = require("multer");

var randomstring = require("randomstring");

/**
 * [UPLOAD_PATH description]
 * @type {String}
 */
var UPLOAD_PATH = './uploads';

/**
 * [destination description]
 * @param  {[type]} req       [description]
 * @param  {[type]} file      [description]
 * @param  {[type]} cb)       {                                  cb(null, exports.UPLOAD_PATH);            }             [description]
 * @param  {[type]} filename: function      (req, file, cb) {                                     cb(null, file.fieldname +             '-' + Date.now());    }} [description]
 * @return {[type]}           [description]
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
/**
 * [upload description]
 * @type {[type]}
 */
var upload = multer({
    storage: storage
});



/**
 * [ImageUploadModel description]
 * @type {[type]}
 */
var ImageUploadModel = require('../models/imageUploadModel');
var UserSignInModel = require('../models/usersModel');
/**
 * [description]
 * @param  {[type]} '/upload'              [description]
 * @param  {[type]} upload.single('image') [description]
 * @param  {[type]} (req,                  res,          next [description]
 * @return {[type]}                        [description]
 */
router.post('/upload', upload.single('image'), (req, res, next) => {

    // UserSignInModel.findById({user:req.body.id}, (err, user) => {
    //     /**
    //      * [if description]
    //      * @param  {[type]} err [description]
    //      * @return {[type]}     [description]
    //      */
    //     if (err) {
    //         return res.status(500).json({
    //             title: 'Error',
    //             error: err
    //         });
    //     }

        
    // });


    let newImage = new ImageUploadModel();
        newImage.filename = randomstring.generate(7); + '.jpg'
        newImage.imageData = req.body.file;
        //newImage.user = req.body.userId;
        //newImage.originalName = req.file.originalname;
        newImage.desc = req.body.desc;
        newImage.save((err,result) => {
             /**
             * [if description]
             * @param  {[type]} err [description]
             * @return {[type]}     [description]
             */
            if(err){
                return res.status(500).json({
                    title: 'Error',
                    error: err
                });
            }

            // user.images.push(result);
            // user.save();
            
            /**
             * [message description]
             * @type {String}
             */
            res.status(201).json({
                message:'Your Image is saved',
                obj: result 
            });
        });


});
/**
 * [description]
 * @param  {[type]} '/fetchimages'            [description]
 * @param  {[type]} (req,                     res,          next)         [description]
 * @param  {[type]} '-__v').lean().exec((err, images        [description]
 * @return {[type]}                           [description]
 */
router.get('/fetchimages', (req, res, next) => {

    ImageUploadModel.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }


        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
        }
        res.json(images);
    })
});
/**
 * [description]
 * @param  {[type]} '/fetchimages/:id' [description]
 * @param  {[type]} (req,              res,          next) [description]
 * @return {[type]}                    [description]
 */
router.get('/fetchimages/:id', (req, res, next) => {
    let imgId = req.params.id;

    ImageUploadModel.findById(imgId, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }

        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    })
});
/**
 * [description]
 * @param  {[type]} '/fetchimages/:id' [description]
 * @param  {[type]} (req,              res,          next) [description]
 * @return {[type]}                    [description]
 */
router.delete('/fetchimages/:id', (req, res, next) => {
    let imgId = req.params.id;

    ImageUploadModel.findByIdAndRemove(imgId, (err, image) => {
        if (err && image) {
            res.sendStatus(400);
        }

        del([path.join(UPLOAD_PATH, image.filename)]).then(deleted => {
            res.sendStatus(200);
        })
    })
});



module.exports = router;