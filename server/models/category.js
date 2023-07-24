const {Schema, model} = require('mongoose')

const category = new Schema({
  value: {type: String, required: true},
  text: {type: String, required: true}
})

module.exports = model('category', category)
