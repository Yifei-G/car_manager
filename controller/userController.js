var User = require('../models/userModel');
var async = require('async');
const { body,validationResult } = require('express-validator');

function buildUser (dbData){
    let user = {};
    let car = {};
    let carList = [];
    user.firsName = dbData.firstName;
    user.lastNmae = dbData.lastName;
    user.email = dbData.email;
    user.gender = dbData.gender;
    user.URL = dbData.URL;
    if(dbData.car){
        dbData.car.forEach(model => {
            car.carBrand = model.carBrand;
            car.carModel = model.carModel;
            car.URL = model.URL;
            car.fullName = model.fullName;

            carList.push(car);
        });
    }
    user.car = carList;

    return user;
}

exports.userDetail = function(req, res, next){
    User.findById(req.params.id)
    .populate('car','carBrand carModel')
    .exec(function(err, result){
        if(err) {return next(err)};
        res.json({
            user: buildUser(result),
        })
    })
}