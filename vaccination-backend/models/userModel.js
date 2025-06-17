//  Importing Mongoose
// Mongoose is an ODM (Object Data Modeling) library for MongoDB.
// It helps define a structured schema for MongoDB documents.
const mongoose=require('mongoose');



// Defining the User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['parent', 'admin','provider'],
    default: null, // <-- Set default to null
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});







// //  Exporting the Model
// mongoose.model("User", userSchema) → Creates a Mongoose model named "User" based on userSchema.

// Exports the model so that it can be used in other files (require('./models/user'))
module.exports = mongoose.model("User", userSchema);
