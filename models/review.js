const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
   userId: {
    type: String,
    required: true
   },
   apartmentType: {
    type: String,
    max: 100
   },
   desc: {
    type: String,
    max: 500
   },
   location:{
    type: String,
    max: 70
   },
   quality: {
    type: String,
    max: 50
   },
   img: {
    type: String,
   },
   likes: {
    type: Array,
    default: []
   },
   price: {
    type: String,
    max: 40
   },
},
  {timestamps : true}
);

module.exports = mongoose.model('Review', reviewSchema);