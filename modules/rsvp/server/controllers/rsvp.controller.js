var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;


var Rsvp = mongoose.model('Rsvp');




/**
 * Controller for managing wedding rsvps
 * @param { Object } logger - the logger module
 *
 */
function rsvpController(logger) {

  /**
   * Method for creating and updating a user's rsvp
   * POST: /api/rsvp
   * @param { Object } req - the HTTP request object
   * @param { Object } req.body - the RSVP object
   * @param { Object } res - the HTTP response object
   */
  function rsvp(req, res) {
    let doc = mapBodyToModel(req.body);
    doc.user = req.user._id;

    if(doc.attending)
    {
      //add name of person to the rsvp party members list
      if(doc.partyMembers.indexOf(doc.name) < 0)
      {
        doc.partyMembers.unshift(doc.name);
      }

      doc.partySize = doc.partyMembers.length;
    }
    else{
      doc.partySize = 0;
      doc.partyMembers = [];
    }
    //remove any existing RSVPs for this user
    return Rsvp.remove({user: doc.user}).exec()
      .then(result => {
        return doc.save();
      })
      .then(result => {
        console.log(result);
        res.status(200).send({result});
      })
      .catch(error => {
        logger.error(error);
        res.status(500).send();
      });


 
    
  }

  /**
   * Returns promise resolving to a list of all rsvps,
   * sorted by attending then name
   * GET: /api/rsvps
   * @param { Object } req - the HTTP request object
   * @param { Object } res - the HTTP response object
   */
  function readList(req, res) {
    return Rsvp.find({})
      .sort({ name: 1 })
      .sort({ attending: -1 })  
      .sort({partySize: -1})
      
     
      .exec()
      .then(data => {
        res.status(200).send({rsvps: data});
      })
      .catch(error => {
        logger.error('Error retrieving rsvp list', error.errmsg);
        rest.status(500).send();
      });
  }

  /**
   * Returns an rsvp matching the search terms
   * GET: /api/rsvps/search
   * @param { Object } req - the HTTP request object
   * @param { Boolean } req.params.attending - default is true
   * @param { String= } req.params.name - optional. a name to search by
   * @param { String= } req.params.note - optional. note text to search by
   * @param { Object } res - the HTTP response object
   */
  function search(req, res) {
    if (!req.params.name && !req.params.note) {
      return readList(req, res);
    }
    let attending = req.params.attending || true;
    //initial query with outer $and and with empty $or
    let filter = {
      $and: [
        {
          attending: attending
        },
        {
          $or: [
            {
              name: {}
            },
            {
              note: {}
            }
          ]
        }]
    };

    if (req.params.name) {
      filter.name = { $regex: /req.params.name/, $options: 'ix' };
    }

    if (req.params.note) {
      filter.note = { $regex: /req.params.note/, $options: 'ix' };
    }
    return Rsvp.find(filter).exec()
      .then(results => {
        res.status(200).send({ rsvps: results });
      })
      .catch(error => {
        logger.error('Error searching rsvp', error.errmsg);
        res.status(500).send();
      });
  }

  /**
   * Returns the submitted RSVP that is associated to the request user
   * or a new RSVP
   */
  function requestRsvp(req, res)
  {
    return Rsvp.findOne({user: req.user._id})
      .exec()
      .then( rsvp => {
        res.status(200).send({data: rsvp});
      })
      .catch(error => {
        res.status(500).send();
      });
  }

  /**
   * Maps a request body over to Mongoose model fields
   * @param { The HTTP Request Body} body 
   */
  function mapBodyToModel(body) {
    var model = new Rsvp();
    for(let property in model.schema.obj)
    {
      model[property] = body[property] != null? body[property] : model[property];
    }

    return model;
  }


  return {
    rsvp: rsvp,
    readList: readList,
    search: search,
    requestRsvp: requestRsvp
  };
}

module.exports = rsvpController;
