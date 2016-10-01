const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const chefSchema = new Schema({
	name: String,
	profile_img: String,
	cover_img: String,
	email: String,
	phone: String,
	bio: String,
	gps: [Number],
	tags: [String],
	dualPlayer: Boolean		// represents if a chef is also a user
});


// Create the model class
// we tell mongoose that the userSchema correlates to the mongo collection called 'user'
const ModelClass = mongoose.model('Chef', chefSchema);

// Export the model
module.exports = ModelClass;