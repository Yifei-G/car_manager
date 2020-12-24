var User = require('../models/userModel');
var async = require('async');
const { body,validationResult } = require('express-validator');

function buildUser (dbData){
    let user = {};
    let car = {};
    let carList = [];
    user.firstName = dbData.firstName;
    user.lastName = dbData.lastName;
    user.email = dbData.email;
    user.gender = dbData.gender;
    user.URL = dbData.URL;
    if(dbData.car){
        dbData.car.forEach(model => {
            // when creating new user, car will be a list of IDs
            if(model._bsontype == "ObjectID"){
                car = model;
            }
            else{
            // when getting a detail of a user,
            // car info will be populated
            // so car will be a list of objects
                car.carBrand = model.carBrand;
                car.carModel = model.carModel;
                car.URL = model.URL;
                car.fullName = model.fullName;
                
            }
            carList.push(car);
            car = {};      
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
        if(result){
            res.json({
                user: buildUser(result),
            })
        }
        else{
            res.json({
                message: 'User does not exist!!',
            })
        }

    })
}

exports.userCreate = [
    //validation and sanitation
    body('email').custom(value => {
        return User.findOne({'email':value}).then(user =>{
            if(user){
                return Promise.reject('User already exists!!');
            }
        });
    }),
    body('firstName', 'first name can not be empty').trim().isLength({min:1}).escape(),
    body('lastName', 'last name can not be empty').trim().isLength({min:1}).escape(),
    body('email','the email address is invalid!').isEmail().escape(),
    body('gender', 'gender is invalid').optional({checkFalsy:true}).trim().isLength({min:1}).escape(),
    body('car.*').escape(),

    (req, res, next) =>{
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            // There are errors. Render form again with sanitized values/errors messages.
            res.json({
                errors
            });
            return;
        }
        else{
            // Data from form is valid.
            // Create an User object with escaped and trimmed data.
            var user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                gender: req.body.gender,
                car: req.body.car
            });
            user.save(function (err, result){
                if(err) {return next(err)}
                // Successful - return to the new user object
                res.json({
                    newUser: buildUser(user),
                });
            });
        }
    }
]