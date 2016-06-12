const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  dateOfProduction: { type: Date, required: true },
  engineSize: { type: Number, required: true },
  horsePower: { type: Number, required: true },
  photo: String,
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Owner' },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
