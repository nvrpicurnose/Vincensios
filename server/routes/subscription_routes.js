const Subscription = require('../models/subscription_model');
const Meal = require('../models/meal_model');

// GET/past_subs
exports.getPastSubs = function(req, res, next){
	if(req.query.chef_id || req.query.diner_id && req.query.pastSince){
		const pastSince = new Date(req.query.pastSince*1000);
		// use chef_id if only that is available
		if(req.query.chef_id && !req.query.diner_id){
			Subscription.find({"$and":[{chef_id: req.query.chef_id}, {endDate: {$lte:pastSince}}]}, function(err, subs){
				if(err){return next(err)};
				if(subs){
					res.send(subs);
				}else{
					res.send("No subs found");
				}
			});
		// else use diner_id
		}else{
			Subscription.find({"$and":[{diner_id: req.query.diner_id}, {endDate: {$lte:pastSince}}]}, function(err, subs){
				if(err){return next(err)};
				if(subs){
					res.send(subs);
				}else{
					res.send("No subs found");
				}
			});
		}
	}
}

// GET/future_subs
exports.getFutureSubs = function(req, res, next){
	if(req.query.chef_id || req.query.diner_id && req.query.futureSince){
		const futureSince = new Date(req.query.futureSince*1000);
		// use chef_id if only that is available
		if(req.query.chef_id && !req.query.diner_id){
			Subscription.find({"$and":[{chef_id: req.query.chef_id}, {endDate: {$gte:futureSince}}]}, function(err, subs){
				if(err){return next(err)};
				if(subs){
					res.send(subs);
				}else{
					res.send("No subs found");
				}
			});
		// else use diner_id
		}else{
			Subscription.find({"$and":[{diner_id: req.query.chef_id}, {endDate: {$gte:futureSince}}]}, function(err, subs){
				if(err){return next(err)};
				if(subs){
					res.send(subs);
				}else{
					res.send("No subs found");
				}
			});
		}
	}
}


// POST/subscription
exports.addSub = function(req, res, next){
	const newSub = req.body;
	if(newSub.chef_id && newSub.diner_id){
		const sub = new Subscription({
			chef_id: newSub.chef_id,
			diner_id: newSub.diner_id,
			startDate: newSub.startDate,
			endDate: newSub.endDate
		});
		// save() actually saves the new Sub to the db
		// pass in a callback indicating the Sub was created
		sub.save(function(err){
			if(err){return next(err);}
			// Respond to request indicating the Sub was created
			res.json({success: sub});
		});
	}else{
		res.send("Please submit a valid subscription.");
	}
}

// GET/subscriptionMeals?
exports.getMealsFromSub = function(req, res, next){
	if(req.query.chef_id && req.query.startDate && req.query.endDate){
		const startDate = new Date(req.query.startDate*1000);
		const endDate = new Date(req.query.endDate*1000);
		Meal.find({"$and":[{chef_id: req.query.chef_id}, {deliveryDate: {$gte:startDate}}, {deliveryDate: {$lte: endDate}}]}, function(err, subs){
			if(err){return next(err)};
			if(subs){
				res.send(subs);
			}else{
				res.send("No subs found");
			}
		});
	}
}