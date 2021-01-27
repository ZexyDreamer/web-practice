var Guest = require('../models/guest');
const { body, validationResult } = require('express-validator');

exports.all_reservations = (req, res, next) => {
    Guest.find({}, 'first_name second_name date_of_reservation time_of_reservation').exec(function (err, list_guests) {
        if (err) { return next(err); }
        res.render('all_reservations', {guest_list: list_guests });
    })
}

exports.create_guest_get = (req, res, next) => {
    res.render('guest_form')
}

exports.create_guest_post = [
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('Name - required field!'),
    body('second_name').trim().isLength({ min: 1 }).escape().withMessage('Surname - required field!'),
    body('date_of_reservation', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        var guest = new Guest({
            first_name: req.body.first_name,
            second_name: req.body.second_name,
            date_of_reservation: req.body.date_of_reservation
        })
        guest.save(function (err) {
            if (err) return next(err);
            res.redirect(guest.url);
        });
    }
]

exports.guest_detail = (req, res, next) => {
    Guest.findById(req.params.id).exec(function (err, info) {
        if (err) return res.render('guest_instance', {error: `"${req.params.id}" does not exist, try again.`});
        res.render('guest_instance', {guest_info: info, error: `"${req.params.id}" does not exist, try again.`});
    })}

exports.delete_guest = (req, res, next) => {
    Guest.findByIdAndRemove(req.params.id, function deleteGuest(err) {
        if (err) { return next(err); }
        res.render('delete_guest', {mes: `Your reservation ${req.params.id} was canceled`})
    })
}
