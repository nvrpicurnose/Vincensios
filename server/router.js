const ChefRoutes = require('./routes/chef_routes');
const MealRoutes = require('./routes/meal_routes');

module.exports = function(app){

	app.get('/', function(req, res){
		res.send({welcome: "To Vincencios food service!"});
	});

	app.get('/chefs', ChefRoutes.getChefs);
	app.post('/chef', ChefRoutes.addChef);

	app.get('/meals', MealRoutes.getMeals);
	app.post('/meal', MealRoutes.addMeal);
}