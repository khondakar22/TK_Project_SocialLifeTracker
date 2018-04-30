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
 * [bcrypt description]
 * @type {[type]}
 */
/**
 * [jwt description]
 * @type {[type]}
 */
const jwt = require('jsonwebtoken');

 /**
 * [locationModel description]
 * @type {[type]}
 */
const locationModel = require('../models/locationModel'); 
const UserSignInModel = require('../models/usersModel'); 
const ActivityModel = require('../models/activityModel'); 

/**
 * [For Finding Friends and getting the current location of user this route is using]
 * @param  {[type]} '/allLocation' [description]
 * @author-Khondakar Readul Islam
 * @version 0.0.1
 * @author [author] Khondakar Readul Islam
 * @param  {[type]} (req,res,next) [description]
 * @return {[type]}                [description]
 */
router.get('/allLocation', (req,res,next)=>{
    locationModel.find()
    .populate('user')
    .exec((err, locations)=>{
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
          /**
         * [message description]
         * @type {String}
         */
        res.status(201).json({
            message:'Your name is registerd',
            obj: locations 
        });

    })
});

// router.use('/:id', (req,res,next)=>{
//         jwt.verify(req.params.id, new Buffer('Allah', 'base64'),(err,decoded)=>{
//                 if(err){
//                     return res.status(401).json({
//                         title: 'Not Authenticated',
//                         error: err
//                     });
//                 }
//                 next();
//         })
// });

/**
 * [description]
 * @author-Khondakar Readul Islam
 * @version 0.0.1
 * @param  {[type]} '/location'                      [description]
 * @param  {[type]} (req,res,next)                 [description]
 * @param  {[type]} });		addLocation.save((err,result [description]
 * @return {[type]}                                [description]
 */
router.post('/:id/:formatedAddress', (req,res,next)=>{
   // var decoded = jwt.decoded(req.query.token);
   UserSignInModel.findById(req.params.id, (err, user)=>{
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
        var addLocation = new locationModel({
            lat: req.body.lat,
            lng: req.body.lng,
            formatedAddress: req.params.formatedAddress,
            user: req.params.id
        });
        /**
         * [description]
         * @param  {[type]} (err,result [description]
         * @return {[type]}             [description]
         */
        addLocation.save((err,result)=>{
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
            user.location.push(result);
            user.save();

/** Might be proble arose from here if location null showed*/
        var activity = new ActivityModel({
                location:{
                    start: { lat: req.body.lat, lng: req.body.lng },
                    end: { lat: req.body.lat, lng: req.body.lng }
                },
                startpoint: req.params.formatedAddress,
                endpoint: req.params.formatedAddress,
                activity: 'Still',
                user: req.params.id,
                start: Date(),
                end: Date(), 
                
                
               
            });
            activity.save((err,result)=>{
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

            user.activity.push(result);
            user.save()

            });
        
            /**
             * [message description]
             * @type {String}
             */
            res.status(201).json({
                message:'Your name is registerd',
            });
        })
       
    })

   
    
});








module.exports = router;