var express = require('express');
var router = express.Router();

var foodCtrl= require('../controllers/food');



router.get('/food', foodCtrl.foodGet);

router.get('/food/:id', foodCtrl.FoodIdGet);

router.post('/food', foodCtrl.foodPost);
router.delete('/food/:id', foodCtrl.foodDelete);

router.put('/food/:id', foodCtrl.foodPut);

module.exports = router;
