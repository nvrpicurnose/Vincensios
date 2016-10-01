const Chef = require('../models/chef_model');
const User = require('../models/user_model');

// POST/login
exports.login = function(req, res, next){
	const loginCreds = req.body;
	console.log(loginCreds);
	Promise.all([checkChefs(loginCreds), checkDiners(loginCreds)])
		.then(function(results){
			if(results.length > 0){
				res.json({results});
			}else{
				res.json({
					status: "Error",
					message: "No users found"
				})
			}
		})
		.catch(function(err){
			res.json({
				status: "Error",
				message: 'An error occurred finding a matching user.'
			})
		})
}

const checkChefs = (loginCreds) => {
	const p = new Promise(function(resolve, rej){
		Chef.find({email: loginCreds.email}, function(err, chefs){
			if(err){return next(err)};
			if(chefs[0]){
				resolve(chefs[0]);
			}else{
				resolve();
			}
		})
	})
	return p;
}

const checkDiners = (loginCreds) => {
	const p = new Promise(function(resolve, rej){
		User.find({email: loginCreds.email}, function(err, diners){
			if(err){return next(err)};
			if(diners[0]){
				resolve(diners[0]);
			}else{
				resolve();
			}
		})
	});
	return p;
}