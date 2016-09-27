const User = require('../models/user_model');

// GET/users
exports.getUsers = function(req, res, next){
	User.find({}, function(err, users){
		if(err){return next(err)};
		if(users){
			res.send(users);
		}else{
			res.send("No users found");
		}
	})
}

// POST/user
exports.addUser = function(req, res, next){
	const newUser = req.body;
	if(newUser.email && newUser.phone && newUser.name){
		// See if a user with a given email exists
		User.findOne({email: newUser.email}, function(err, existingUser){
			if(err){return next(err);}
			// if a user with this email does exist, we will return an error on request
			if(existingUser){
				// status() sets the error code (eg. 404 Not Found)
				// Errorcode 402 Unprocessable Entity
				return res.status(402).send({error: "Email is in use"});
			}
			// If a user does not exist, create and save new user
			// const user is only a variable, it has not yet saved to the db
			const user = new User({
				email: newUser.email,
				phone: newUser.phone,
				name: newUser.name,
				profile_img: newUser.profile_img
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