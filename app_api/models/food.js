var mongoose = require('mongoose');


var foodSchema = new mongoose.Schema({

    name: { 
        type: String,
           required: true},
 date: {type: Date,
        required: true},
  expiry: Date,
    left_over:
    {
        type: Boolean,
        default: false
    },
    
    quantity: 
    {
        type: Number,
        default: 1,
        min: 1
    }
});



mongoose.model('food', foodSchema);