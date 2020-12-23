var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new Schema({
    carBrand: {type:String, required: true, maxlength:70},
    carModel: {type:String, required:true, maxlength:100},
    productYear: {type:Date},
    convertible: {type:Boolean}
});

CarSchema.virtual('URL').get(function(){
    return `/car/${this._id}/detail`; 
});

CarSchema.virtual('fullName').get(function(){
    return `${this.carBrand} - ${this.carModel}`;
});

module.exports = mongoose.model('Car', CarSchema);