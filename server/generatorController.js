const Place = require('./models/place');
const Category = require('./models/category');
const siteUser = require('./models/siteUser');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require('./config');

Array.prototype.random = function (){
  return this[Math.floor(Math.random() * this.length)];
}

class GeneratorController {
  async addPlace(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Game over"});
      }
      const {
        title,
        address,
        description,
        bus_station,
        rating,
        rates_count,
        sum_of_rating,
        tags,
        photo
      } = req.body;
      const place = new Place({
        title,
        address,
        description,
        bus_station,
        rating,
        rates_count,
        sum_of_rating,
        tags,
        photo
      });
      await place.save();
      return res.status(200).json({message: 'You are awesome!'});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Fuck you c:'});
    }
  }

  async getPlace(req, res) {
    const category = req.query.category;
    const errors = validationResult(req);
    console.log(category)
    if (!errors.isEmpty()) {
      res.status(400).json({message: "You are invalid!"});
    }
    const place = await Place.find({tags: category});
    if (!place) {
      res.status(400).json('Net mesta bro');
    }
    console.log("l")
    console.log(place)
    return res.status(200).send(place.random());
  }

  async rate(req, res) {
    try {
      const userToken = req.headers.authorization.split(' ')[1];
      if (!userToken) {
        return res.status(403).json({message: 'authorization failed'});
      }

      const {placeId, rate} = req.body;
      let place = await Place.findOne({_id: placeId});

      const countRate = place.rates_count + 1;
      const rateSum = place.sum_of_rating + rate;
      const currentRating = rateSum / countRate;

      place = await Place.findOneAndUpdate({_id: placeId}, {$set: {
          rates_count: countRate,
          sum_of_rating: rateSum,
          rating: currentRating
        }});
      await place.save();

      const userId = jwt.verify(userToken, secret);
      const userPlace = {
        _id: place._id,
        title: place.title,
        photo: place.photo.random(),
        rating: rate
      };

      const user = await siteUser.findOne({_id: userId.id});
      if (!user) {
        res.status(400).json({message: "Couldn't find user by id!"})
      }
      await user.places.push(userPlace);
      await user.save();

      return res.status(200).send(user)
    } catch (e) {
      console.log(e);
      return res.status(403).json({message: 'Authorized failed'});
    }
  }
  async getCategories(req, res) {
    try{
      const resp = await Category.find({});
      return res.status(200).json(resp);
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: 'Bad Request'});
    }
  }
}


module.exports = new GeneratorController()
