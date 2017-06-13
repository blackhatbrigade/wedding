var mongoose = require('mongoose');

var q = require('q');

var _ = require('lodash');

var gallery = mongoose.model('gallery');

function galleryController(logger, shared) {
  const GET_LIMIT = 10;

  /**
   * Create a gallery.
   *
   * @param {Request}  req The Express request Object.
   * @param {Response} res The Express response Object.
   *
   * @return {Response}
   */
  function create(req, res) {
    var model = mapBodyToModel(req.body);
    
    var gallerySearch = findgalleryByName(model.name);

    // Make sure this isn't actually an update.
    gallerySearch.then((results) => {
      if (results) {
        return res.status(400).send('gallery exists');
      } else {
        logger.info('Creating gallery ' + model.name);

        model.save(function(err) {
          if (err) {
            // TODO: This is not a specific error, but the whole mongoose error object.
            logger.error(err);

            return res.status(500).send('Internal Server Error');
          } else {
            return res.status(200).json(model);
          }
        });
      }
    });
  };


  /**
   * Show the gallery determined by the id in the URI.
   *
   * @param {Request}  req The Express request Object.
   * @param {Response} res The Express response Object.
   *
   * @return {Response}
   */
  function readById(req, res) {
    var user = req.user;

    var galleryId = req.params.galleryId;

    findgalleryById(galleryId).then((result) => {
      return res.status(200).send(result);
    },(err) => {
      logger.error('Error looking up gallery: ', err);

      return res.status(500).send('Internal Server Error');
    });
  };

  /**
   * Show a list of gallery.
   *
   * @param {Request}  req The Express request Object.
   * @param {Response} res The Express response Object.
   *
   * @return {Response}
   */
  function list(req, res) {
    var user = req.user;

    var page = req.params.page;

    if (!page) {
      page = 1;
    }

    // Fire the main list query.
    gallery
      .find({})
      .select({'name': 1})
      .sort({
        name: 1
      })
      .limit(GET_LIMIT)
      .skip(GET_LIMIT * (page - 1))
      .exec((err, results) => {
        if (err) {
          logger.error('Error retreiving list of organizations: ', err.errmsg);

          res.status(500).send('Internal Server Error');
        }

        res.status(200).send(results);
      });
  }

  /**
   * Update a gallery.
   *
   * @param {Request}  req The Express request Object.
   * @param {Response} res The Express response Object.
   *
   * @return {Response}
   */
  function update(req, res) {
    var body = mapBodyToModel(req.body);
    
    var user = req.user;

    var model = findgalleryById(req.body._id);

    // Make sure user has permissions to update this company.
    isAuthorized(user, req.body._id)
      .then((authorized) => {
        if (authorized) {
          model.exec((err, result) => {
            mapOverModel(body, result);

            result.save((err) => {
              if (err) {
                // TODO: This is not a specific error, but the whole mongoose error object.
                logger.error('Error updating organization', err);

                return res.status(500).send('Internal Server Error');
              }
              return res.status(200).send({data: result._id + ' updated'});
            });
          });
        } else {
          logger.info('Unauthorized attempt to modify an gallery');
          res.status(401).send('Unauthorized');
        }
      }, (error) => {
        // TODO: This is not a specific error, but the whole mongoose error object.
        logger.error('Error finding out if user is authorized to modify organization: ', error);

        res.status(500).send('Internal Server Error');
      });
  };

  /**
   * Delete a gallery
   *
   * @param {Request}  req The Express request Object.
   * @param {Response} res The Express response Object.
   *
   * @return {Response}
   */
  function deletegallery(req, res) {
    var modelId = req.params.gallery;

    gallery.findOne({_id: modelId})
      .exec((err, result) => {
        if (err) {
          logger.info('Error finding target gallery to delete.', err.errmsg);

          return res.status(500).send('Internal Server Error');
        }

        result.remove(function(err) {
        if (err) {
          // This needs more robust error handling.
          logger.error('Error deleting gallery', err.errmsg);

          return res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send(result);
        }
      });
    });
  };

  /*
   * ------------------------------ Private Methods -----------------------------------
   */

  /**
   * Find an gallery by it's Id.
   *
   * @param {string} id The id to search for.
   *
   * @param {gallery} The mongoose model.
   */
  function findgalleryById(id) {
    var deferred = q.defer();

    return gallery.findOne({'_id': id});
  }

  /**
   * Checks if an gallery exists given a name.
   *
   * @param {string} name The name of the gallery to search for.
   *
   * @return {gallery} The gallery that matched or null if none did.
   */
  function findgalleryByName(name) {
    var deferred = q.defer();

    gallery.find({'name': name})
      .exec((err, results) => {
        if (err) {
          logger.error('Error finding organizations by name', err.errmsg);

          deferred.reject(err.errmsg);
        }
        if (results.length > 0) {
          deferred.resolve(results[0]);
        } else {
          deferred.resolve([]);
        }
      });

    return deferred.promise;
  }

  /**
   * Maps request gallery data to a gallery mongoose object.
   *
   * Validation, outside of what mongoose enforces, is not done!
   *
   * @param {Object} body The post vars from the request.
   *
   * @return {gallery}
   */
  function mapBodyToModel(body) {
    var org = new gallery();
    var schemaFields = gallery.schema.obj;
    var index;

    if (body._id) {
      org._id = body._id;
    }

    for(index in Object.keys(schemaFields)) {
      let realIndex = Object.keys(schemaFields)[index];
      if (body[realIndex]) {
        org[realIndex] = body[realIndex];
      }
    }

    return org;
  }

  /**
   * Maps request gallery over an existing gallery mongoose object.
   *
   * @param {Object} The post vars from the request.
   * @param {gallery} The mongoose object to copy the data to.
   *
   * @return {void}
   */
  function mapOverModel(body, org) {
    var schemaFields = gallery.schema.obj;
    var index;

    for(index in Object.keys(schemaFields)) {
      let realIndex = Object.keys(schemaFields)[index];
      if (body[realIndex]) {
        org[realIndex] = body[realIndex];
      }
    }
  }

  /*
   * Hook for overriding permissions set by the Role Manager.
   *
   * @param {User}    user      The mongoose user object for the current user making the request.
   * @param {string}  resource  The resource being requested.
   *
   * @return {boolean}
   */
  function isAuthorized(user, resource) {
    // TODO: Currently set to deny any request not approved by the resource manager.
    return false;
  }

  return {
    read          : readById,
    create        : create,
    update        : update,
    list          : list,
    delete        : deletegallery,
    isAuthorized  : isAuthorized
  };
}

module.exports = galleryController;
