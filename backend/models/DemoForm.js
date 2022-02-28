var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true},
    org: {type: String,required: true},
    ccode: {type: String,required: true},
    designation: {type: String,required: true},
    phone: {type: String,required: true},
    message: {type: String,required: true},
});

var model = mongoose.model('DemoForm', schema);

module.exports = model;