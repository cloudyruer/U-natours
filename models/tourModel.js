const mongoose = require('mongoose');

// Mongoose uses the native JS data types
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },

  duration: {
    type: Number,
    required: [true, 'A tour must have a durations'],
  },

  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },

  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },

  ratingsAverage: {
    type: Number,
    default: 4.5,
  },

  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },

  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, //only work for string, will remove all the white space begin and end
    required: [true, 'A tour must have a description'],
  },

  description: {
    type: String,
    trim: true,
  },

  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },

  images: [String], // array of string
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  startDates: [Date],
});

// convention: use uppercase on model name
const Tour = mongoose.model('Tour', tourSchema);

// a new document (object) create by tour model (function constructor)/class

module.exports = Tour;
