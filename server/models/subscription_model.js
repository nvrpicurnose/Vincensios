const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const subSchema = new Schema({
	chef_id: String,
	diner_id: String,
	startDate: Date,
	endDate: Date,
	createdAt: Date
});

// Before each save (on save hook), run this function (which encrypts password)
subSchema.pre('save', function(next){
	const currentDate = new Date();

	this.createdAt = currentDate;
	next();
});

// Create the model class
// we tell mongoose that the userSchema correlates to the mongo collection called 'user'
const ModelClass = mongoose.model('Subscription', subSchema);

// Export the model
module.exports = ModelClass;