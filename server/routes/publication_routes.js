const Subscription = require('../models/subscription_model');
const Meal = require('../models/meal_model');

// GET/past_pubs
exports.getPastPubs = function(req, res, next){
	if(req.query.chef_id && req.query.pastSince){
		const pastSince = new Date(parseInt(req.query.pastSince));

		extractSubsAndMeals("$lte", req.query.chef_id, pastSince)
			.then(function(data){
				res.json(data);
			});
	}
}

// GET/future_pubs
exports.getFuturePubs = function(req, res, next){
	if(req.query.chef_id && req.query.futureSince){
		const futureSince = new Date(parseInt(req.query.futureSince));

		extractPubsAndMeals("$gte", req.query.chef_id, futureSince)
			.then(function(data){
				res.json(data);
			});
	}
}

// find all subscriptions to this chef within the date range
// then find related meals and return to client
function extractPubsAndMeals(comparisonOperator, chef_id, since){
	const comparisonOperatorX = comparisonOperator;
	// since we are dynamically creating these variable names, we use ES6 ComputedPropertyName to extract the desired field names (eg. 'diner_id', "$lte") for our query
	const query = {"$and":[{"chef_id": chef_id}, {endDate: {[comparisonOperatorX]: since}}]};
	const p = new Promise(function(res, rej){
		// find a subscription based on an id (whosId) and '$gte' or '$lte' (comparisonOperator) 
		Subscription.find(query, function(err, pubs){
			if(err){
				console.log(err);
				return err
			};
			if(pubs){
				extractMeals(comparisonOperator, chef_id, since)
					.then(function(meals){
						const publicationData = {
							pubs: pubs,
							pub_meals: meals
						};
						res(publicationData);
					});
			}else{
				res([]);
			}
		});
	});
	return p;
}

// Get the upcoming meal publications for this chef
function extractMeals(comparisonOperator, chef_id, since){
	const comparisonOperatorX = comparisonOperator;
	const query = {"$and":[{"chef_id": chef_id}, {deliveryDate: {[comparisonOperatorX]: since}}]};
	const p = new Promise(function(res, rej){
		Meal.find(query, function(err, meals){
			if(err){return err};
			if(meals){
				res(meals);
			}else{
				rej([]);
			}
		})
	});
	return p;
}
