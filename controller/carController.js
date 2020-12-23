var Car = require('../models/carModel');
var async = require('async');
const { body,validationResult } = require('express-validator');

function buildCar(dbData){
    let car = {};
    if(dbData.length){
        let carList = [];
        dbData.forEach(data => {
             car ={
                URL: data.URL,
                carBrand: data.carBrand,
                productYear: data.productYear
            }
            carList.push(car);
        });
        return carList;
    }
    else{
         car = {
            URL: dbData.URL,
            carBrand: dbData.carBrand,
            carModel: dbData.carModel,
            carFullname: dbData.fullName,
            productYear: dbData.productYear,
            convertible: dbData.convertible
        }
        return car;
    }
}

exports.index = function(req , res, next){
    Car.countDocuments(function(err, result){
        res.json({
            totalCount: result,
        });
    });
}

exports.carList = function(req, res, next){
    Car.find({}, 'carBrand productYear')
    .exec(function(err, results){
        if(err){return next(err)};
        if(results){
            res.json({
                carList: buildCar(results),
            })
        }
        else{
            res.json({
                message: 'No cars!!!',
            })
        }
        
    });
}

exports.carDetail = function(req, res, next){
    Car.findById(req.params.id,function(err, result){
        if(err) {return next(err)};
        if(result){
            res.json({
                car: buildCar(result),
            })
        }
        else{
            res.json({
                message: "Car doesn't exist!!",
            })
        }

    })
}

exports.carCreate =[
    body('carBrand','Car brand can not be empty!').trim().isLength({min:1}).escape(),
    body('carModel','Car model can not be empty!').trim().isLength({min:1}).escape(),
    body('productYear', 'Invalid Year!').optional({checkFalsy:true}).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {
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
            // Create an Car object with escaped and trimmed data.
            var car = new Car({
                carBrand: req.body.carBrand,
                carModel: req.body.carModel,
                productYear: req.body.productYear,
                convertible: req.body.convertible
            });
            car.save(function (err){
                if(err) {return next(err)}

                // Successful - return to the new car object
                res.json({
                    newCar: buildCar(car),
                });
            });
        }
    }
]

exports.carUpdate = [
    body('carBrand','Car brand can not be empty!').trim().isLength({min:1}).escape(),
    body('carModel','Car model can not be empty!').trim().isLength({min:1}).escape(),
    body('productYear', 'Invalid Year!').optional({checkFalsy:true}).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {
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
            // Create an Car object with escaped and trimmed data.
            var car = new Car({
                carBrand: req.body.carBrand,
                carModel: req.body.carModel,
                productYear: req.body.productYear,
                convertible: req.body.convertible,
                _id: req.params.id
            });
            Car.findByIdAndUpdate(req.params.id, car, function (err, updatedCar){
                if(err) {return next(err)}

                // Successful - return to the updated car object
                res.json({
                    modifiedCar: buildCar(updatedCar)
                });
            });
        }
    }
]

exports.carDelete = function(req, res, next){
    Car.findByIdAndRemove(req.params.id, function(err){
        if(err) {return next(err);}
        res.json({
            message: 'Car deleted successfully'
        })
    })
}