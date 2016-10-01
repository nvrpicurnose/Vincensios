const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
	name: String,
	profile_img: String,
	email: String,
	phone: String,
	dualPlayer: Boolean		// represents if a chef is also a user
});


// Create the model class
// we tell mongoose that the userSchema correlates to the mongo collection called 'user'
const ModelClass = mongoose.model('User', userSchema);

// Export the model
module.exports = ModelClass;