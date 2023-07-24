const siteUser = require('./models/siteUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require('./config');

const generateToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class authController{
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message: 'invalid data', errors});
            }
            const {firstname, lastname, username, password} = req.body;
            const candidate = await siteUser.findOne({username});
            if (candidate) {
                return res.status(400).json({message: 'Username is already exists'});
            }
            const passwordHash = bcrypt.hashSync(password, 5);
            const user = new siteUser({firstname, lastname, username, password: passwordHash});
            await user.save();
            const token = generateToken(user._id);
            return res.status(200).send({auth: true, token: token, user: user});
        }catch(e) {
            console.log(e);
            res.status(400).json({message: 'Reg error , check data'});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await siteUser.findOne({username});
            if (!user) {
                return res.status(400).json({field: 'username invalid'});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({field: 'password invalid'});
            }
            const token = generateToken(user._id);
            return res.status(200).send({auth: true, token: token, user: user});
        }catch(e) {
            res.status(400).json({message: "Login error , check data"});
        }
    }
    async checkUserAvailability(req, res) {
      try{
        const username = req.query.username;
        const check = await siteUser.find({username: username});
        if (check.length > 0) {
          return res.json({status: false});
        } else {
          return res.json({message: true});
        }
      } catch (e) {
        console.log(e);
        return res.status(401).json({message: 'Bad request'});
      }
    }
}

module.exports = new authController();
