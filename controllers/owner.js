const Owner = require('../models/Owner');
const Car = require('../models/Car');

exports.getOwner = (req, res) => {
  return Owner.find().then((owners) => {
    return res.status(200).send(owners);
  });
};

exports.postOwner = (req, res) => {
  req.assert('firstName', 'First Name cannot be empty').notEmpty();
  req.assert('lastName', 'Last Name cannot be empty').notEmpty();
  req.assert('phone', 'Phone Number cannot be empty').notEmpty();
  req.assert('phone', 'Phone Number must be a number').isInt();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/owners/create');
  }

  const owner = new Owner({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
  });

  owner.save((err) => {
    if (err) {
      req.flash('errors', err);
      return res.redirect('/owners/create');
    }

    req.flash('susccess', { msg: 'New owner created!' });
    return res.redirect('/owners');
  });
};

exports.deleteOwner = (req, res) => {
  const _id = req.params.id;

  if (!_id) {
    return res.status(422).send('Invalid id');
  }

  Car.remove({ owner: _id }, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    Owner.remove({ _id: _id }, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.sendStatus(200);
    });
  });
};


exports.getOwners = (req, res) => {
  return Owner.find().then((owners) => {
    res.render('owners/owners', {
      title: 'Owner',
      owners: owners,
    });
  });
};

exports.getCreateOwners = (req, res) => {
  return res.render('owners/create', {
    title: 'Owner - create',
  });
};
