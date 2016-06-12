const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number, required: true },
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
