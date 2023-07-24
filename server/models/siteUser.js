const {Schema, model} = require('mongoose');


const siteUser = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  places: {type: []}
})

module.exports = model('siteUser', siteUser);
