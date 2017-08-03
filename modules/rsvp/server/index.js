
var Rsvp = require('./models/rsvp.model');

var RsvpController = require('./controllers/rsvp.controller.js');


/**
 * Top level function that wraps all of the module together to return to the application.
 */
function Rsvps([logger]) {
  return new RsvpController(logger);
};
module.exports = Rsvps;
