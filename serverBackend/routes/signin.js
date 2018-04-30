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
const UserSignInModel = require('../models/usersModel'); 

/**
 * [description]
 * @author-Khondakar Readul Islam
 * @version 1.0.0 
 * @param  {[type]} '/signin'      [description]
 * @param  {[type]} (req,res,next) [description]
 * @return {[type]}                [description]
 */
router.post('/signin', (req,res,next)=>{
		
		/**
		 * [description]
		 * @param  {[type]} options.email:req.body.email [description]
		 * @param  {[type]} (err,getUser                 [description]
		 * @return {[type]}                              [description]
		 */
		UserSignInModel.findOne({emailAddress:req.body.emailAddress},(err,user)=>{
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
			 * [if description]
			 * @param  {[type]} !getUser [description]
			 * @return {[type]}          [description]
			 */
			if(!user){
				return res.status(401).json({
					title: 'Please check again, Loggin failed ',
					error: {message:'Unauthorized User Information'}
				});
			}
			/**
			 * [if description]
			 * @param  {[type]} !passwordCrypt.compareSync(req.body.password, getUser.password) [description]
			 * @return {[type]}                                               [description]
			 */
			if(!passwordCrypt.compareSync(req.body.password,user.password)){
				return res.status(401).json({
					title: 'Please check again, Loggin Failed',	
					message: 'Password does not matched',
				})
			}
			/**
			 * [Signing a token with 1 hour of expiration:]
			 * @type {[type]}
			 */
			var token = jwt.sign({user:user},'Allah', { expiresIn: '1h' });
			/**
			 * [message description]
			 * @type {String}
			 */
			res.status(201).json({
				message:'You are successfully logged in',
				token: token, 
				userId: user._id  
			});
		});
});


/**
 * [description]
 * @author-Khondakar Readul Islam
 * @version 1.0.0 
 * @param  {[type]}   '/:id'         [description]
 * @param  {Function} (req,res,next) [description]
 * @return {[type]}                  [description]
 */
router.delete('/:id', (req,res,next)=>{
	UserSignInModel.findById(req.params.id, (err, user)=>{
		if(err){
			return res.status(500).json({
				title: 'Error',
				error: err
			});
		}
		user.remove((err,result)=>{
			if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
		});

	});
});

/**
 * [description]
 * @author-Khondakar Readul Islam
 * @version 1.0.0 
 * @param  {[type]}   'passUpdate/:id' [description]
 * @param  {Function} (req,res,next)   [description]
 * @return {[type]}                    [description]
 */
router.patch('/:id',(req,res,next)=>{
	UserSignInModel.findById(req.params.id,(err,user)=>{
		if(err){
			return res.status(500).json({
				title: 'Error',
				error: err
			});
		}
		user.password =  passwordCrypt.hashSync(req.body.password, 15);
		user.save((err,result)=>{
			if(err){
				return res.status(500).json({
					title: 'Error',
					error: err
				});
			}
			res.status(200).json({
				message:'Updated Password', 
				obj:result
			})
		})  
	})
})



/**
 * For testing purpose
 * @author- Khondakar Readul Islam 
 */
router.get('/all', (req,res,next)=>{
	UserSignInModel.find((err, user)=>{
			
			if(err){
				return res.status(500).json({
					title: 'Error',
 					error: err
				});
				}
			
				res.status(200).json({
					message: 'Deleted message',
				obj: user
				
			});
	
		});
 })



module.exports = router;
