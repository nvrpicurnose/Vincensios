const Subscription = require('../models/subscription_model');

// GET/subscriptions
exports.getSubs = function(req, res, next){
	if(req.query.chef_id || req.query.diner_id){
		// use chef_id if only that is available
		if(req.query.chef_id && !req.query.diner_id){
			Subscription.find({chef_id: req.query.chef_id}, function(err, subs){
				if(err){return next(err)};
				if(subs){
					res.send(subs);
				}else{
					res.send("No subs found");
				}
			});
		// else use diner_id
		}else{
			Subscription.find({diner_id: req.query.diner_id}, function(err, subs){
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
	if(newSub.meal_id && newSub.chef_id && newSub.diner_id){
		const sub = new Sub({
			meal_id: newSub.meal_id,
			chef_id: newSub.chef_id,
			diner_id: newSub.diner_id,
			subscribeDate: newSub.subscribeDate,
			deliveryDate: newSub.deliveryDate
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