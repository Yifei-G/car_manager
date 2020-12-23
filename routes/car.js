var express = require('express');
var router = express.Router();

// Require controller modules.
var carController = require('../controller/carController');


router.get('/', carController.index);

router.get('/all',carController.carList);

router.get('/:id/detail',carController.carDetail);

router.post('/create', carController.carCreate);

router.put('/:id/update', carController.carUpdate);

router.delete('/:id/delete', carController.carDelete);

module.exports = router;