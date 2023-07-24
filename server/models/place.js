const {Schema, model} = require('mongoose')

const place = new Schema({
  title: {type: String, required: true},
  address: {type: String, required: true},
  description: {type: String, required: true},
  bus_station: {type: String},
  rating: {type: Number, required: true},
  rates_count: {type: Number, default: 0},
  sum_of_rating: {type: Number, default: 0},
  tags: [String],
  photo: [String],
})

module.exports = model('place', place)
