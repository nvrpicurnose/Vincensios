const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const mealSchema = new Schema({
	name: String,
	chef_id: String,
	cover_img: String,
	desc: String,
	ingredients: [String],
	tags: [String],
	deliveryDate: Date,
	createdAt: Date
});

// Before each save (on save hook), run this function (which encrypts password)
mealSchema.pre('save', function(next){
	const currentDate = new Date();

	this.createdAt = currentDate;
	next();
});

// Create the model class
// we tell mongoose that the userSchema correlates to the mongo collection called 'user'
const ModelClass = mongoose.model('Meal', mealSchema);

// Export the model
module.exports = ModelClass;