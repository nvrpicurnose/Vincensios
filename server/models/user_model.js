const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
	name: String,
	chef: Boolean,
	diner: Boolean,
	profile_img: String,
	cover_img: String,
	email: String,
	phone: String,
	bio: String,
	gps: [Number],
	tags: [String],
	createdAt: Date
});

// Before each save (on save hook), run this function (which encrypts password)
userSchema.pre('save', function(next){
	const currentDate = new Date();

	this.createdAt = currentDate;
	next();
});

// Create the model class
// we tell mongoose that the userSchema correlates to the mongo collection called 'user'
const ModelClass = mongoose.model('User', userSchema);

// Export the model
module.exports = ModelClass;