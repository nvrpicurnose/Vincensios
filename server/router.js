const ChefRoutes = require('./routes/chef_routes');
const MealRoutes = require('./routes/meal_routes');
const UserRoutes = require('./routes/user_routes');
const AuthRoutes = require('./routes/auth_routes');
const SubscriptionRoutes = require('./routes/subscription_routes');
const PublicationRoutes = require('./routes/publication_routes');

module.exports = function(app){

	app.get('/', function(req, res){
		res.send({welcome: "To Vincencios food service!"});
	});

	app.get('/chefs', ChefRoutes.getChefs);
	app.post('/chef', ChefRoutes.addChef);
	app.post('/del_chef', ChefRoutes.delChef);

	app.get('/meals', MealRoutes.getMeals);
	app.post('/meal', MealRoutes.addMeal);
	app.post('/del_meal', MealRoutes.delMeal);

	app.get('/diners', UserRoutes.getDiners);
	app.post('/diner', UserRoutes.addDiner);

	app.get('/future_subs', SubscriptionRoutes.getFutureSubs);
	app.get('/past_subs', SubscriptionRoutes.getPastSubs);
	app.post('/subscription', SubscriptionRoutes.addSub);

	app.get('/future_pubs', PublicationRoutes.getFuturePubs);
	app.get('/past_pubs', PublicationRoutes.getPastPubs);

	app.post('/login', AuthRoutes.login);
}