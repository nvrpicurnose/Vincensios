const User = require('../models/user_model');

// GET/diners
exports.getDiners = function(req, res, next){
	User.find({diner: true}, function(err, users){
		if(err){return next(err)};
		if(users){
			res.send(users);
		}else{
			res.send("No users found");
		}
	})
}

// POST/diner
exports.addDiner = function(req, res, next){
	const newDiner = req.body;
	if(newDiner.email && newDiner.phone && newDiner.name){
		// See if a user with a given email exists
		User.findOne({email: newDiner.email}, function(err, existingDiner){
			if(err){return next(err);}
			// if a user with this email does exist, we will return an error on request
			if(existingDiner){
				// status() sets the error code (eg. 404 Not Found)
				// Errorcode 402 Unprocessable Entity
				return res.status(402).send({error: "Email is in use"});
			}
			// If a user does not exist, create and save new user
			// const user is only a variable, it has not yet saved to the db
			const user = new User({
				email: newDiner.email,
				phone: newDiner.phone,
				name: newDiner.name,
				profile_img: newDiner.profile_img,
				chef: false,
				diner: true
			});
			// save() actually saves the new user to the db
			// pass in a callback indicating the user was created
			user.save(function(err){
				if(err){return next(err);}
				// Respond to request indicating the user was created
				res.json({success: user});
			});
		});
	}else{
		res.send("Please include at least a name, email and phone.");
	}
}