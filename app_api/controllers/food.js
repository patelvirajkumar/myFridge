var mongoose = require('mongoose');
var foodModel = mongoose.model('food');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};



/* Get food list*/
module.exports.foodGet = function(req, res) {
  foodModel.find({}, function(err, food){
      if(err) return sendJSONresponse(res, 400, err);
      sendJSONresponse(res, 200, food);
  })
  };
  

  
// Post Method
module.exports.foodPost = function(req, res){
    if (req.body.name){
        if (req.body.date){
            if (req.body.quantity && req.body.quantity >= 1){
                foodModel.create(req.body ,function(err, obj) {
                    if (err) {
                      sendJSONresponse(res, 400, err);
                      return;

                    } else {
                      sendJSONresponse(res, 201, obj);
                      return;
                    }
                  });
            }else{
                sendJSONresponse(res, 404, {"message": "Invalid Quantity...."});
            }    
        }else{
            sendJSONresponse(res, 404, {"message": "Please enter date(it's Required )"});
        }    
    }else{
        sendJSONresponse(res, 404, {"message": "Required Name...."});
    }
};



 /* GET food with the help of Id*/
module.exports.FoodIdGet = function(req, res) {
    if (req.params.id){
        foodModel.find({'_id': req.params.id}, function (err, food) {
            if (err) {
                return sendJSONresponse(res, 400, err);
            }
            
            return sendJSONresponse(res, 200, food);
          })
        
    }else
        {
        sendJSONresponse(res, 404, {"message": "No such Id Found."})
    }
    
  };

/* Delete Data */
module.exports.foodDelete = function(req, res) {
    if (req.params.id){
        foodModel
            .findById(req.params.id)
            .exec(function(err, food){
                if (err){
                    sendJSONresponse(res, 404, err);
                }else{
                    if (food){
                        if (food.quantity > 1){
                            food.quantity = food.quantity - 1;
                            food.save(function(err, food){
                                if (err){
                                    sendJSONresponse(res, 404, err);
                                }else{
                                    sendJSONresponse(res, 200, food);
                                }
                            });
                        }else{
                            food.remove({"_id": req.params.id}, function(err, result){
                                if(err){
                                    sendJSONresponse(res, 404, err);
                                    return;
                                }else{
                                    sendJSONresponse(res, 204, null);
                                    return;
                                }
                            });
                        }
                    }else{
                        sendJSONresponse(res, 404, {"message": "Item does not exist"});
                        return;
                    }
                }
            });
    }
    else {
        sendJSONresponse(res, 404, {"message": "No Food Id Found"});
        return;
    }
  };


/* PUT */
module.exports.foodPut = function(req, res) {
    if (req.params.id){
        foodModel
            .findById(req.params.id)
            .exec(function(err, food){
                if (err){
                    sendJSONresponse(res, 404, err);
                    return;
                }else{
                    if (food){
                        food.name = req.body.name;
                        food.date = req.body.date;
                        food.expiry = req.body.expiry;
                        food.left_overs = req.body.left_overs;
                        food.quantity = req.body.quantity;
                        food.save(function(err, food){
                            if (err){
                                sendJSONresponse(res, 404, err);
                                return;
                            }else{
                                console.log(food);
                                sendJSONresponse(res, 200, food);
                                return;
                            }
                        });         
                    }else{
                        sendJSONresponse(res, 404, {"message": "Item can not be updated"});
                        return;    
                    }
                }
            });
    }
    else {
        sendJSONresponse(res, 404, {"message": "Id not Found"});
        return;
    }
  };