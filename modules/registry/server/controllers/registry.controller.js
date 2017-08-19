var mongoose = require('mongoose');

var q = require('q');

var _ = require('lodash');

var registry = mongoose.model('registry');

function registryController(logger, users, registryHelper) {
  const GET_LIMIT = 10;

  /**
   * Create a registry.
   *
   * @param {Request}  req The Express request Object.
   * @param {Response} res The Express response Object.
   *
   * @return {Response}
   */
  function create(req, res) {
    // Check if user has permissions to create a registry entry.
    if (req.user.role !== 'admin') {
      logger.warn('User attempted to create registry entry: ' + req.user.username);
    }

    // Save entry
    registryHelper.create(req.body)
      .then((entry) => {
        // Return saved object
        logger.info('Registry entry created');
        res.status(200).send(entry);
      })
      .catch((err) => {
        logger.error('Error creating registry entry');
        res.status(500).send({error: 'Internal Server Error'});
      });
  };


  /**
   * Show registry entry(s).
   *
   * @param {Request}  req The Express request Object.
   * @param {Response} res The Express response Object.
   *
   * @return {Response}
   */
  function read(req, res) {
    let user = req.user;

    let registryId = req.params.registryId;

    // Check if this is a specific query.
    if (registryId) {
      registryHelper.readById(registryId)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          logger.error("Error getting registry entry by Id: ", error);
          res.status(500).send(data);
        });
    // Otherwise this is a list request.
    } else {
      registryHelper.readList({})
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          logger.error("Error getting registry list", error);
          res.status(500).send({error: 'Internal Server Error'});
        });
    }
  };

  /**
   * Update a registry.
   *
   * @param {Request}  req The Express request Object.
   * @param {Response} res The Express response Object.
   *
   * @return {Response}
   */
  function update(req, res) {
    // Check for authorization.
    if (!registryHelper.adminRequiredUpdate(req.body)) {
      registryHelper.updateEntry(req.body)
        .then((updatedEntry) => {
          res.status(200).send(updatedEntry);
        })
        .catch((error) => {
          logger.error("Error updating Entry", error);
          res.status(500).send({error: 'Internal Server Error'});
        });
    } else {
      // Check for admin.
      if (req.user.role === 'admin') {
        registryHelper.updateEntry(req.body)
          .then((updatedEntry) => {
            res.status(200).send(updatedEntry);
          })
          .catch((error) => {
            logger.error("Error updating Entry", error);
            res.status(500).send({error: 'Internal Server Error'});
          });
      } else {
        res.status(403).send({error: 'Not Authorized'});
      }
    }
  };

  /**
   * Delete a registry
   *
   * @param {Request}  req The Express request Object.
   * @param {Response} res The Express response Object.
   *
   * @return {Response}
   */
  function deleteRegistryEntry(req, res) {
    var modelId = req.params.registry;

    if (!modelId) {
      return res.status(400).send({error: 'Id required to delete registry entry'});
    }

    if (req.user.role === 'admin') {
      registryHelper.deleteEntry(modelId)
        .then((success) => {
          if (success) {
            res.status(200).send();
          } else {
            logger.error('Registry Entry not deleted');

            res.status(500).send({error: 'Unknown error, entry not deleted'});
          }
        })
        .catch((error) => {
          logger.error("error removing registry entry", error);

          res.status(500).send({error: 'Internal Server Error'});
        });
    } else {
      res.status(403).send({error: 'Must be administrator to remove registry items'});
    }
  };

  /*
   * Hook for overriding permissions set by the Role Manager.
   *
   * @param {User}    user      The mongoose user object for the current user making the request.
   * @param {string}  resource  The resource being requested.
   *
   * @return {boolean}
   */
  function isAuthorized(user, resource) {
    // Check if just the reserved field is being changed.

    // Otherwise check if admin
  }

  return {
    read          : read,
    create        : create,
    update        : update,
    delete        : deleteRegistryEntry,
    isAuthorized  : isAuthorized
  };
}

module.exports = registryController;
