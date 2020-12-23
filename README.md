# car_manager

## About this repository:
This is a REST API project using Node express framwork, mongoose and MongoDB. The car manager contains 2 resources, User and Cars. 

Each user can have a list of cars.The objective of this project is to get familiar with Express and mongoose after finishing the  [MDN tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

## End points:
/car/all  (GET)

List all the cars. 
```

Response:
{
    "carList": [
        {
            "URL": "/car/5fdfb56ccb14c32bae505ee5/detail",
            "carBrand": "Chevrolet",
            "productYear": "1988-01-01T00:00:00.000Z"
        },
        {
            "URL": "/car/5fdfb56ccb14c32bae505ee6/detail",
            "carBrand": "Aston Martin",
            "productYear": "2010-01-01T00:00:00.000Z"
        },
        {
            "URL": "/car/5fdfb56ccb14c32bae505ee7/detail",
            "carBrand": "Maserati",
            "productYear": "1970-01-01T00:00:00.000Z"
        },
        {
            "URL": "/car/5fdfb56ccb14c32bae505ee8/detail",
            "carBrand": "Nissan",
            "productYear": "1974-01-01T00:00:00.000Z"
        },
        {
            "URL": "/car/5fdfb56ccb14c32bae505ee9/detail",
            "carBrand": "Mercedes Benz",
            "productYear": "1967-01-01T00:00:00.000Z"
        }
    ]
}
```

/car/:id/detail  (GET)
get all the information of a specific car

Response:
```
{
    "car": {
        "URL": "/car/5fe276b6d15444804510bcd2/detail",
        "carBrand": "Volkswagen",
        "carModel": "e-Golf",
        "carFullname": "Volkswagen - e-Golf",
        "productYear": "1988-01-01T00:00:00.000Z"
    }
}
```

car/create (POST)

create a new car

required field:
carBrand
carModel

Example:

```
{
    "carBrand": "Volkswagen",
    "carModel": "Golf3",
    "productYear": "1998-01-01T00:00:00.000Z",
    "convertible": false
}
```


car/:id/update (PUT)

Update a specific Car:

Example:
```
{
    "carBrand": "Volkswagen",
    "carModel": "e-Golf",
    "productYear": "1988-01-01T00:00:00.000Z"
}
```

car/:id/delete (DELETE)

Delete a specific Car

Response:
```
{
    "message": "Car deleted successfully"
}
```


## How to install the project:

This is a NPM project, please install all the dependencies using NPM package manager. 
The data base is running in Mongo Atlas, the DB credentials are loaded from an envoriment variable.(gitignored)
If you want to run this project locally, please create a mongo data base on your own. 

To install the dependencies:
```
npm install
```

To run the project:
```
npm run start
```
