const P = require('bluebird');
const firstImage = require('first-image-search-load');
const Car = require('../models/Car');

exports.getCars = (req, res, next) => {
  P.coroutine(function* () {
    const cars = yield Car.find();

    return res.render('cars/cars', {
      title: 'Car',
      cars: cars,
    });
  })().nodeify(next);
};

exports.getCreateCar = (req, res) => {
  return res.render('cars/create', {
    title: 'Car - create'
  });
};

exports.postCar = (req, res, next) => {
  console.log(req.body);
  req.assert('brand', 'Brand is required').notEmpty();
  req.assert('model', 'Model is required').notEmpty();
  req.assert('dateOfProduction', 'Date of production is required').notEmpty();
  req.assert('dateOfProduction', 'Date of production is required').isDate();
  req.assert('engineSize', 'Engine size is required').notEmpty();
  req.assert('engineSize', 'Engine must be int').isInt();
  req.assert('horsePower', 'Horse power is required').notEmpty();
  req.assert('horsePower', 'Horse power must be int').isInt();
  req.assert('owner', 'You must specify the owner').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/cars/create');
  }

  const dateOfProduction = new Date(req.body.dateOfProduction);

  firstImage.getFirstImageURL(`${req.body.brand} ${req.body.model} ${dateOfProduction.getFullYear()}`)
  .then((photo) => {
    const car = new Car({
      brand: req.body.brand,
      model: req.body.model,
      dateOfProduction: dateOfProduction,
      engineSize: req.body.engineSize,
      horsePower: req.body.horsePower,
      photo: photo,
      owner: req.body.owner,
    });

    car.save((err) => {
      if (err) {
        req.flash('errors', err);
        return res.redirect('/cars/create');
      }

      req.flash('success', { msg: `Added car: ${req.body.brand} ${req.body.model}.` });
      return res.redirect('/cars');
    });
  });
};

exports.deleteCar = (req, res, next) => {
  const _id = req.params.id;

  if (!_id) {
    return res.status(422).send('Invalid id');
  }

  Car.remove({ _id: _id }, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.sendStatus(200);
  });
};
