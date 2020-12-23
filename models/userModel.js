var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {type: String, required: true, maxlength:40},
    lastName: {type: String, required: true, maxlength:40},
    email: {type: String, required: true},
    gender:{type: String, maxlength:10},
    car:[{type:Schema.Types.ObjectId, ref: 'Car'}]
});

userSchema.virtual('URL').get(function(){
    return `/users/${this._id}/detail`; 
});

module.exports = mongoose.model('User', userSchema);