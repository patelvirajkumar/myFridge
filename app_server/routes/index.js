var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

router.get('/', ctrlFood.listFoodHome);
router.get('/food/delete/:id', ctrlFood.foodItemDelete);
router.get('/create_edit', ctrlFood.create);
router.get('/create_edit/:id', ctrlFood.DataLoad);

router.post('/create_edit', ctrlFood.create_new_item);
router.post('/create_edit/:id', ctrlFood.put_Item);

module.exports = router;
