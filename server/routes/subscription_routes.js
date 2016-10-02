const Subscription = require('../models/subscription_model');
const Meal = require('../models/meal_model');

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


// GET/past_subs
exports.getPastSubs = function(req, res, next){
	if(req.query.chef_id || req.query.diner_id && req.query.pastSince){
		const pastSince = new Date(parseInt(req.query.pastSince));
		// use chef_id if only that is available
		if(req.query.chef_id && !req.query.diner_id){
			extractSubsAndMeals("chef_id", "$lte", req.query.chef_id, pastSince)
				.then(function(data){
					console.log("Got some sweet sweet data:");
					console.log(data);
					res.json(data);
				});
		// else use diner_id
		}else{
			extractSubsAndMeals("diner_id", "$lte", req.query.diner_id, pastSince)
				.then(function(data){
					console.log("Got some sweet sweet data:");
					console.log(data);
					res.json(data);
				});
		}
	}
}

// GET/future_subs
exports.getFutureSubs = function(req, res, next){
	if(req.query.chef_id || req.query.diner_id && req.query.futureSince){
		const futureSince = new Date(parseInt(req.query.futureSince));
		// use chef_id if only that is available
		if(req.query.chef_id && !req.query.diner_id){
			extractSubsAndMeals("chef_id", "$gte", req.query.chef_id, futureSince)
				.then(function(data){
					res.json(data);
				});
		// else use diner_id
		}else{
			extractSubsAndMeals("diner_id", "$gte", req.query.diner_id, futureSince)
				.then(function(data){
					res.json(data);
				});
		}
	}
}

// Promise.all() an array of promises for each sub
// return an object with subs and meals
function extractSubsAndMeals(whosId, comparisonOperator, id, since){
	const whosIdX = whosId;
	const comparisonOperatorX = comparisonOperator;
	// since we are dynamically creating these variable names, we use ES6 ComputedPropertyName to extract the desired field names (eg. 'diner_id', "$lte") for our query
	const query = {"$and":[{[whosIdX]: id}, {endDate: {[comparisonOperatorX]: since}}]};
	const p = new Promise(function(res, rej){
		// find a subscription based on an id (whosId) and '$gte' or '$lte' (comparisonOperator) 
		Subscription.find(query, function(err, subs){
			if(err){
				console.log(err);
				return err
			};
			if(subs){
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
					const subscriptionData = {
						subs: subs,
						sub_meals: flattenedMeals
					}
					res(subscriptionData);
				});
			}else{
				res([]);
			}
		});
	});
	return p;
}

// return an array of meal promises for each subscription
// output is used for Promise.all() in extractSubsAndMeals()
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

// get meals related to this subscription
function getMealsForThisSub (sub) {
	const startDate = new Date(sub.startDate*1000);
	const endDate = new Date(sub.endDate*1000);
	const p = new Promise(function(res, rej){
		Meal.find({"$and":[{chef_id: sub.chef_id}]}, function(err, meals){
			if(err){return err};
			if(meals.length > 0){
				res(meals);
			}else{
				res();
			}
		});
	});
	return p;
}

// , {deliveryDate: {$gte:startDate}}, {deliveryDate: {$lte: endDate}}