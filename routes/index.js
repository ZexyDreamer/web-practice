var express = require('express');
var router = express.Router();

var guest_controller = require('../controllers/guest_controller');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/guest_all', guest_controller.all_reservations)

router.get('/guest/create', guest_controller.create_guest_get);

router.post('/guest/create', guest_controller.create_guest_post);

router.get('/guest/:id', guest_controller.guest_detail);

router.post('/guest/:id/delete', guest_controller.delete_guest);

module.exports = router;