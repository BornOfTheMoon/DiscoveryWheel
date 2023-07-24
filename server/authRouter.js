const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check} = require('express-validator');
const authMiddleware = require('./middlewares/authMiddle');

router.post('/register',[
    check('username','Username invalid(empty)').notEmpty(),
    check('password', 'Password length must be greater than 8 and less 16 symbols')
        .isLength({min: 8, max: 16})
],controller.registration);
router.post('/login', controller.login);
router.get('/nameavailable', controller.checkUserAvailability);
module.exports = router
