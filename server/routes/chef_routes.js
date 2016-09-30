const Chef = require('../models/chef_model');

// GET/chefs
exports.getChefs = function(req, res, next){
	Chef.find({}, function(err, chefs){
		if(err){return next(err)};
		if(chefs){
			res.send(chefs);
		}else{
			res.send("No chefs found");
		}
	})
}

// POST/chef
exports.addChef = function(req, res, next){
	const newChef = req.body;
	if(newChef.email && newChef.phone && newChef.name){
		// See if a chef with a given email exists
		Chef.findOne({email: newChef.email}, function(err, existingChef){
			if(err){return next(err);}
			// if a chef with this email does exist, we will return an error on request
			if(existingChef){
				// status() sets the error code (eg. 404 Not Found)
				// Errorcode 402 Unprocessable Entity
				return res.status(402).send({error: "Email is in use"});
			}
			// If a chef does not exist, create and save new chef
			// const chef is only a variable, it has not yet saved to the db
			const chef = new Chef({
				email: newChef.email,
				phone: newChef.phone,
				name: newChef.name,
				profile_img: newChef.profile_img,
				cover_img: newChef.cover_img,
				bio: newChef.bio,
				gps: newChef.gps,
				tags: newChef.tags
			});
			// save() actually saves the new chef to the db
			// pass in a callback indicating the chef was created
			chef.save(function(err){
				if(err){return next(err);}
				// Respond to request indicating the chef was created
				res.json({success: chef});
			});
		});
	}else{
		res.send("Please include at least an name, email and phone.");
	}
}

// POST/del_chef
exports.delChef = function(req, res, next){
	const chef = req.body;
	if(chef){
		Chef.findOne({_id: chef._id}, function(err, existingChef){
			if(err){return next(err);}
			// if a chef with this email does exist, we will return an error on request
			if(existingChef){
				existingChef.remove(function(err){
					res.json({
						message:"Successfully removed "+existingChef.name,
						deleted: existingChef
					});
				});
			}
		});
	}else{
		res.json("Please specify a chef to delete.")
	}
}