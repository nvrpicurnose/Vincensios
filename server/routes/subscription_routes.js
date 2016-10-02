const Subscription = require('../models/subscription_model');
const Meal = require('../models/meal_model');

// POST/subscription
exports.addSub = function(req, res, next){
	const newSub = req.body;
	console.log(newSub.startDate);
	console.log(newSub.endDate);
	if(newSub.chef_id && newSub.diner_id){
		Subscription.find({$and:[{chef_id: newSub.chef_id}, {diner_id: newSub.diner_id}, {startDate: newSub.startDate}, {endDate: newSub.endDate}]}, function(err, subs){
			if(err){res.send(err)};
			console.log("Checking if this subscription is already made...");
			console.log(subs);
			if(subs.length > 0){
				res.json({
					success: false,
					message: "You have already subscribed to this chef for the upcoming week!"
				});
			// only save this new subscription if it does not yet exist
			}else{
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
					res.json({
						success: true,
						message: "Successfully subscribed to this chef for the upcoming week!", 
						sub
					});
				});
			}
		})
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
		console.log("Inside the query");
		Subscription.find(query, function(err, subs){
			console.log("Inside the query results");
			if(err){
				console.log(err);
				return err
			};
			if(subs){
				const promiseArray = extractSubPromises(subs);
				console.log("promiseArray");
				Promise.all(promiseArray).then((allMeals)=>{
					console.log("Finished the Promise.all()");
					// Promise.all() returns an array of the results
					// each result is an array, so allMeals is an array of arrays
					// thus we must flatMap this array of arrays
					const flattenedMeals = [];
					allMeals.forEach((meal)=>{
						// check that meal itself is not undefined (occurs when you subscribe to a chef with no upcoming meals)
						if(typeof meal != 'undefined'){	
							// filter allMeals for undefined
							let filtered = meal.filter((data)=>{
								if(typeof data != 'undefined'){
									return data;
								}
							})
							filtered.forEach((meal)=>{
								// console.log("about to add meal to flatmap");
								flattenedMeals.push(meal);
							})
						}else{
							// if meal was undefined, we continue the forEach loop
							return;
						}
					})
					const subscriptionData = {
						subs: subs,
						sub_meals: flattenedMeals
					}
					console.log(subscriptionData);
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
	console.log("Inside extractSubPromises");
	const array = subs.reduce((prev, curr, index) => {
		const subMealPromise = getMealsForThisSub(curr);
		if(subMealPromise && subMealPromise.length == 0){
			console.log("Empty meals");
			return prev;
		}else{
			console.log("Some meals found");
	    	return [...prev, subMealPromise];
		}
	}, []);
	return array;
}

// get meals related to this subscription
function getMealsForThisSub (sub) {
	console.log("Inside getMealsForThisSub");
	const startDate = new Date(sub.startDate*1000);
	const endDate = new Date(sub.endDate*1000);
	const p = new Promise(function(res, rej){
		Meal.find({"$and":[{chef_id: sub.chef_id}]}, function(err, meals){
			if(err){return err};
			if(meals.length > 0){
				console.log("Found a meal");
				res(meals);
			}else{
				console.log("Found no meal");
				res();
			}
		});
	});
	return p;
}

// , {deliveryDate: {$gte:startDate}}, {deliveryDate: {$lte: endDate}}