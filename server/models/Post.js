const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  HotelName: {
    type: String,
    required: true
  },
  HotelLocation: {
    type: String,
    required: true
  },
  HotelDesc:{
    type: String,
    required: true
  },
  rating: {
    type: Number,
  },
  rooms: {
    type: Number,
  }
});

module.exports = mongoose.model('Post', PostSchema);