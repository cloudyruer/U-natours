const mongoose = require('mongoose');

// Mongoose uses the native JS data types
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// convention: use uppercase on model name
const Tour = mongoose.model('Tour', tourSchema);

// a new document (object) create by tour model (function constructor)/class

module.exports = Tour;
