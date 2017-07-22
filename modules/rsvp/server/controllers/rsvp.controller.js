var mongoose = require('mongoose');
var Rsvp = mongoose.model('Rsvp');
var q = require('q');
mongoose.Promise = require('q').Promise;


/**
 * Controller for managing wedding rsvps
 * @param { Object } logger - the logger module
 *
 */
function rsvpController(logger) {

  /**
   * Method for creating an rsvp
   * POST: /api/rsvp
   * @param { Object } req - the HTTP request object
   * @param { Object } req.body - the RSVP object
   * @param { Object } res - the HTTP response object
   */
  function create(req, res) {
    return Rsvp.save(req.body)
      .then(dbObject => {
        res.status(201).send(dbObject);
      })
      .catch(error => {
        logger.error('Error creating rsvp', error.errmsg);
        res.status(500).send();
      });
  }

  /**
   * Returns promise resolving to a list of all rsvps,
   * sorted by name
   * GET: /api/rsvps
   * @param { Object } req - the HTTP request object
   * @param { Object } res - the HTTP response object
   */
  function readList(req, res) {
    return Rsvp.find({})
      .sort({ name: 1 })
      .exec()
      .then(data => {
        res.status(200).send(data);
      })
      .catch(error => {
        logger.error('Error retrieving rsvp list', error.errmsg);
        rest.status(500).send();
      });
  }

  /**
   * Returns an rsvp matching the search terms
   * @param { Object } req - the HTTP request object
   * @param { string= } req.params.name - optional. a name to search by
   * @param { string= } req.params.note - optional. note text to search by
   * @param { Object } res - the HTTP response object
   */
  function search(req, res) {
    if (!req.params.name && !req.params.note) {
      return readList(req, res);
    }
    //start off with an empty $or query
    let filter = {
      $or: [
        {
          name: {}
        },
        {
          note: {}
        }
      ]
    };
    
    if (req.params.name) {
        filter.name = { $regex: /req.params.name/, $options: 'ix' }
      }
    }
    if (req.params.note) {
      filter.note = { $regex: /req.params.note/, $options: 'ix' }
    }
    return Rsvp.find(filter).exec()
      .then(results => {
        res.status(200).send({rsvps: results});
      })
      .catch(error => {
        logger.error('Error searching rsvp', error.errmsg);
        res.status(500).send();
      })
}

return {
  create: create,
  readList: readList,
  search: search
}

module.exports = rsvpController;
