const User = require('../models/user_model');

// POST/login
exports.login = function(req, res, next){
	const loginCreds = req.body;
	User.find({email: loginCreds.email}, function(err, users){
		if(err){return next(err)};
		if(users){
			res.json(users[0]);
		}else{
			res.send("No user found by that email");
		}
	});
}
