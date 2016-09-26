const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const mealSchema = new Schema({
	name: String,
	chef_id: String,
	cover_img: String,
	desc: String,
	ingredients: [String],
	tags: [String]
});


// Create the model class
// we tell mongoose that the userSchema correlates to the mongo collection called 'user'
const ModelClass = mongoose.model('Meal', mealSchema);

// Export the model
module.exports = ModelClass;