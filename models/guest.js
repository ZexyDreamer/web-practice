var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var GuestSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 50},
    second_name: {type: String, required: true, maxlength: 50},
    date_of_reservation: {type: Date, required: true}
  }
);

GuestSchema
.virtual('url')
.get(function () {
  return '/guest/' + this._id;
});

GuestSchema
.virtual('date_of_reservation_formatted')
.get(function () {
  return this.date_of_reservation ? moment(this.date_of_reservation).format('YYYY-MM-DD') : '';
});

module.exports = mongoose.model('Guest', GuestSchema);
