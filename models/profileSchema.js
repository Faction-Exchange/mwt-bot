const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {type: String, required: true, unique: true},
    currency: {type: Number, default: 1250},
    bank: {type: Number, default: 0},
    pocket: {type: Number, default: 0},
});

const model = mongoose.model('ProfileModels', profileSchema);
module.exports = model;