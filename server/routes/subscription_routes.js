const Subscription = require('../models/subscription_model');
const Meal = require('../models/meal_model');


// GET/past_subs
exports.getPastSubs = function(req, res, next){
	if(req.query.chef_id || req.query.diner_id && req.query.pastSince){
		console.log("Getting past subs...");
		const pastSince = new Date(parseInt(req.query.pastSince));
		console.log(" ================== pastSince ========================");
		console.log(req.query.pastSince);
		console.log(pastSince);
		const newPastSince = pastSince.toISOString();
		console.log(" ================== newPastSince ========================");
		console.log(newPastSince);
		// use chef_id if only that is available
		if(req.query.chef_id && !req.query.diner_id){
			console.log("Finding subs for chef");
			Subscription.find({"$and":[{chef_id: req.query.chef_id}, {endDate: {$lte:pastSince}}]}, function(err, subs){
				if(err){return next(err)};
				if(subs){
					console.log("Found subscriptions for this chef");
					const promiseArray = extractSubPromises(subs);
					Promise.all(promiseArray).then((allMeals)=>{
						const subscriptionData = {
							subs: subs,
							sub_meals: allMeals
						}
						console.log(allMeals);
						res.json(subscriptionData);
					});
				}else{
					res.send("No subs found");
				}
			});
		// else use diner_id
		}else{
			console.log("Finding subs for diners");
			Subscription.find({"$and":[{diner_id: req.query.diner_id}, {endDate: {$lte:pastSince}}]}, function(err, subs){
				if(err){return next(err)};
				if(subs){
					console.log("Found subscriptions for this diner");
					//console.log(subs);
					const promiseArray = extractSubPromises(subs);
					Promise.all(promiseArray).then((allMeals)=>{
						// Promise.all() returns an array of the results
						// each result is an array, so allMeals is an array of arrays
						// thus we must flatMap this array of arrays
						const flattenedMeals = [];
						allMeals.forEach((meal)=>{
							// filter allMeals for undefined
							let filtered = meal.filter((data)=>{
								if(data !== null){
									return data;
								}
							})
							filtered.forEach((meal)=>{
								flattenedMeals.push(meal);
							})
						})
						
						console.log("flattenedMeals =============");
						console.log(flattenedMeals);
						const subscriptionData = {
							subs: subs,
							sub_meals: flattenedMeals
						}
						res.json(subscriptionData);
					});
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
					const promiseArray = extractSubPromises(subs);
					Promise.all(promiseArray).then((allMeals)=>{
						const subscriptionData = {
							subs: subs,
							sub_meals: allMeals
						}
						console.log(allMeals);
						res.json(subscriptionData);
					});
				}else{
					res.send("No subs found");
				}
			});
		// else use diner_id
		}else{
			Subscription.find({"$and":[{diner_id: req.query.chef_id}, {endDate: {$gte:futureSince}}]}, function(err, subs){
				if(err){return next(err)};
				if(subs){
					const promiseArray = extractSubPromises(subs);
					console.log("============= GOT UP TO HERE ==========");
					Promise.all(promiseArray).then((allMeals)=>{
						const subscriptionData = {
							subs: subs,
							sub_meals: allMeals
						}
						console.log('========================');
						console.log(allMeals);
						res.json(subscriptionData);
					});
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


// extract the array of promises
function extractSubPromises(subs){
	const array = subs.reduce((prev, curr, index) => {
		const subMealPromise = getMealsForThisSub(curr);
		if(subMealPromise && subMealPromise.length == 0){
			return prev;
		}else{
	    	return [...prev, subMealPromise];
		}
	}, []);
	return array;
}

// Why do i return 1??
function getMealsForThisSub (sub) {
	const startDate = new Date(sub.startDate*1000);
	const endDate = new Date(sub.endDate*1000);
	const p = new Promise(function(res, rej){
		Meal.find({"$and":[{chef_id: sub.chef_id}]}, function(err, meals){
			if(err){return err};
			if(meals.length > 0){
				console.log("We got some meals!");
				console.log(meals);
				res(meals);
			}else{
				console.log("We got no meals!");
				res();
			}
		});
	});
	return p;
}

// , {deliveryDate: {$gte:startDate}}, {deliveryDate: {$lte: endDate}}