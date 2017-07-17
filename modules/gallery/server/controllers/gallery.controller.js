var mongoose = require('mongoose');

var q = require('q');

var _ = require('lodash');

var gallery = mongoose.model('gallery');

const config = require('../../../../config/config');

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
    model.creator = req.user._id;
    
    var gallerySearch = findgalleryByName(model.name);

    // Make sure this isn't actually an update.
    gallerySearch.then((results) => {
      if (results.length) {
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

    findgalleryById(galleryId).exec().then((result) => {
      if (result) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send();
      }
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
      .select({'name': 1, 'thumbnail': 1})
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
    let body = req.body;
    
    var user = req.user;

    var model = findgalleryById(req.body._id);

    model.exec().then((foundGallery) => {
      if(isAuthorized(user, foundGallery, 'write')) {
        mapOverModel(body, foundGallery);

        return foundGallery.save();
      } else {
        throw new Error('Forbidden');
      }
    }).then((savedGallery) => {
      res.status(200).send({ data: savedGallery });
    }).catch((error) => {
      if (error.message === 'Forbidden') {
        res.status(403).send();
      } else if (error.errors) {
        res.status(400).send({ error: error.errors });
      } else {
        logger.error('Error in GalleryController#update', error);
        res.status(500).send();
      }
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
    var modelId = req.params.galleryId;

    gallery.findOne({ _id: modelId }).exec().then((foundGallery) => {
      if (foundGallery) {
        if (isAuthorized(req.user, foundGallery, 'write')) {
          return foundGallery.remove();
        } else {
          throw new Error('Forbidden');
        }
      } else {
        throw new Error('Not found');
      }
    }).then((removed) => {
      res.status(204).send();
    }).catch((error) => {
      if (error.message === 'Not found') {
        res.status(404).send();
      } else if (error.message === 'Forbidden') {
        res.status(403).send();
      } else {
        logger.error('Error in GalleryController#deletegallery', error);
        res.status(500).send();
      }
    });
  };

  /**
   * Upload a file
   */
  function uploadFile(req, res, next) {
    let query;

    let user = req.user;
    let galleryId = req.query.galleryId;

    let uploadConfig = {
      strategy: 's3',
      req: req,
      res: res,
      s3: config.uploads.s3
    };

    query = gallery.findById(galleryId);

    return query.exec().then((foundGallery) => {
      if (foundGallery) {
        return shared.uploader.upload(uploadConfig).then((url) => {
          foundGallery.pictures.push({
            url: url,
            user: user._id,
            uploader: user.displayName
          });

          if (!foundGallery.thumbnail) {
            foundGallery.thumbnail = url;
          }

          return foundGallery.save().then((savedGallery) => {
            res.status(201).send({ url: url, gallery: savedGallery });
          });
        });
      } else {
        throw new Error('not found');
      }
    }).catch((error) => {
      if (error.message === 'not found') {
        res.status(404).send();
      } else {
        logger.error('in gallery#uploadFile', error);
        res.status(500).send();
      }
    });
  }

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
      if (body[realIndex] !== undefined) {
        org[realIndex] = body[realIndex];
      }
    }
  }

  /*
   * Hook for overriding permissions set by the Role Manager.
   *
   * @param {User}    user      The mongoose user object for the current user making the request.
   * @param {string}  resource  The resource being requested.
   * @param {string}  operation - whether the resource is being read or written
   *
   * @return {boolean}
   */
  function isAuthorized(user, resource, operation) {
    let authorized = false;

    if (operation === 'read') {
      // check if the repo is public read
      if (resource.publicRead) {
        authorized = true;
      } else {
        authorized = resource.allowedUsers.includes(user._id) || user._id.equals(resource.creator);
      }
    } else if (operation === 'write') {
      if (resource.publicWrite) {
        authorized = true;
      } else {
        authorized = resource.allowedUsers.includes(user._id) || user._id.equals(resource.creator);
      }
    } // else not sure what you passed, so go away
    
    return authorized;
  }

  return {
    read          : readById,
    create        : create,
    update        : update,
    list          : list,
    delete        : deletegallery,
    isAuthorized  : isAuthorized,
    uploadFile    : uploadFile
  };
}

module.exports = galleryController;
