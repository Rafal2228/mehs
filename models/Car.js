const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  dateOfProduction: Date,
  engineSize: Number,
  horsePower: Number,
  photo: String,
  owner: mongoose.Schema.Types.ObjectId,
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
