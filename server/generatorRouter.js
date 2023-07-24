const Router = require('express')
const router = new Router()
const controller = require('./generatorController')


router.post('/add', controller.addPlace);
router.get('/place', controller.getPlace);
router.post('/sendrate', controller.rate);
router.get('/categories', controller.getCategories);

module.exports = router
