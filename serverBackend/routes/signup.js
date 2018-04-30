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
const passwordCrypt = require('bcryptjs');
/**
 * [jwt description]
 * @type {[type]}
 */
const jwt = require('jsonwebtoken');
/**
 * [UserSignUpModel description]
 * @type {[type]}
 */
var UserSignUpModel = require('../models/usersModel'); 

/**
 * [description]
 * @author-Khondakar Readul Islam
 * @version 1.0.0
 * @param  {[type]} '/signup'                      [description]
 * @param  {[type]} (req,res,next)                 [description]
 * @param  {[type]} });		newUser.save((err,result [description]
 * @return {[type]}                                [description]
 */
router.post('/signup', (req,res,next)=>{
		var newUser = new UserSignUpModel({
			userName:req.body.userName,
			userRole: req.body.userRole,
    		firstName: req.body.firstName,
		    lastName: req.body.lastName,
		    password: passwordCrypt.hashSync(req.body.password, 15), 
		    emailAddress: req.body.emailAddress
		});
		/**
		 * [description]
		 * @param  {[type]} (err,result [description]
		 * @return {[type]}             [description]
		 */
		newUser.save((err,result)=>{
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
				obj: result 
			});
		})
});






module.exports = router;


