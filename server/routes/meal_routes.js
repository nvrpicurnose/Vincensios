const Meal = require('../models/meal_model');

// GET/meals
exports.getMeals = function(req, res, next){
	// req.query lets you retreive params from url (eg. http://myapp.com/meals?chef_id=123)
	if(req.query.chef_id){
		Meal.find({chef_id: req.query.chef_id}, function(err, meals){
			if(err){return next(err)};
			if(meals){
				res.send(meals);
			}else{
				res.send("No meals found");
			}
		});
	}else{
		res.send("Please specify a chef_id to find meals");
	}
}

// POST/meal
exports.addMeal = function(req, res, next){
	const newMeal = req.body;
	if(newMeal.name && newMeal.chef_id && newMeal.cover_img){
		// See if a Meal with a given email exists
		Meal.findOne({email: newMeal.email}, function(err, existingMeal){
			if(err){return next(err);}

			const meal = new Meal({
				name: newMeal.name,
				chef_id: newMeal.chef_id,
				cover_img: newMeal.cover_img,
				desc: newMeal.desc,
				ingredients: newMeal.ingredients,
				tags: newMeal.tags,
				deliveryDate: newMeal.deliveryDate
			});
			// save() actually saves the new Meal to the db
			// pass in a callback indicating the Meal was created
			meal.save(function(err){
				if(err){return next(err);}
				// Respond to request indicating the Meal was created
				res.json({success: meal});
			});
		});
	}else{
		res.send("Please include at least a meal name, chef_id and main_img.");
	}
}

// POST/del_meal
exports.delMeal = function(req, res, next){
	const meal = req.body;
	if(meal){
		Meal.findOne({_id: meal._id}, function(err, existingMeal){
			if(err){return next(err);}
			// if a meal with this email does exist, we will return an error on request
			if(existingMeal){
				existingMeal.remove(function(err){
					res.json({
						message:"Successfully removed "+existingMeal.name,
						deleted: existingMeal
					});
				});
			}
		});
	}else{
		res.json("Please specify a meal to delete.")
	}
}