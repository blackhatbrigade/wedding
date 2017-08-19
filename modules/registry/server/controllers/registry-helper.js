var mongoose = require('mongoose');

var q = require('q');

var _ = require('lodash');

var registry = mongoose.model('registry');

function registryHelper(logger) {
  /**
   * The list of admin restricted fields on the registry model.
   */
  const restrictedList = [ 'title', 'reservedBy', 'url', 'description', 'pic' ];

  /**
   * Create a registry entry in mongo given some registry entry data.
   *
   * @param {Object} registryEntry A registry entry with at least minimal data.
   *
   * @param {Promise<registry>}
   */
  function create(registryEntry) {
    let registryObject = mapRegistryEntry(registryEntry);

    return registryObject.save();
  }

  /**
   * Given a object with at least some of the field in a registry object, will return a mongoose object.
   *
   * @param {Object} blob The object to try to map to a registry mongoose object.
   *
   * @param {registry}
   */
  function mapRegistryEntry(blob) {
    let newRegistry = new registry();
    let schemaFields = registry.schema.obj;

    if (blob._id) {
      newRegistry._id = blob._id;
    }

    for(index in Object.keys(schemaFields)) {
      let realIndex = Object.keys(schemaFields)[index];

      if (blob[realIndex]) {
        newRegistry[realIndex] = blob[realIndex];
      }
    }
    
    return newRegistry;
  }

  /**
   * Maps new registry entry data onto an existing registry entry mongoose object.
   *
   * @params {registryEntry} existing The Mongoose object for the current entry.
   * @params {Object}        newEntry The blob containing updated data.
   *
   * @return {Promise<registryEntry>}
   */
  function mapExistingRegistryEntry(existing, newEntry) {
    let schemaFields = registry.schema.obj;
    let index;

    for(index in Object.keys(schemaFields)) {
      let realIndex = Object.keys(schemaFields)[index];
      if (newEntry[realIndex]) {
        existing[realIndex] = newEntry[realIndex];
      }
    }
  }

  /**
   * Retrieves a registry entry given an Object Id.
   *
   * @param {String} entryId The Id of the the entry to retrieve.
   *
   * @return {Promise<registryEntry>}
   */
  function readById(entryId) {
    return registry.findOne({_id: entryId})
      .exec();
  }

  /**
   * Retrieve a list of registry entries.
   *
   * @param {Object} params Optional parameters that can be included.
   *
   * @return {Array<registryEntry>}
   */
  function readList(params) {
    return registry.find({})
      .sort({ title: 1})
      .exec();
  }

  /**
   * Updates a registry entry item.
   *
   * @param {Object} updatedEntry The updated data for an entry which must have the old id.
   *
   * @return {Promise<registry>}
   */
  function updateEntry(updatedEntry) {
    return new Promise((resolve, reject) => {
      if (!updatedEntry._id) {
        throw new Exception("An Id is required to update an entry");
      }

      registry.findOne({_id: updatedEntry._id})
        .exec()
        .then((existing) => {
          existing = mapRegistryEntry(existing, updatedEntry);
          resolve(existing.save());
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Checks if the update requested requires admin access or not.
   *
   * @param {Object} changes The updates being requested.
   *
   * @returns {Boolean}
   */
  function adminRequiredUpdate(changes) {
    // Check if a restricted field is in the change list.
    for (let i = 0; i < restrictedList.length; i++) {
      for (let j = 0; j < changes.length; j++) {
        if (changes[j] === restricdList[i] && j !== '_id') {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Deletes the specified entry.
   *
   * @param {String} modelId The id of the registry entry to delete.
   * 
   * @return {Boolean}
   */
  function deleteEntry(modelId) {
    registry.findOne({_id: modelId})
      .exec((err, result) => {
        if (err) {
          logger.info('Error finding target registry to delete.', err.errmsg);

          return res.status(500).send('Internal Server Error');
        }

        result.remove(function(err) {
        if (err) {
          // This needs more robust error handling.
          logger.error('Error deleting registry', err.errmsg);

          return res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send(result);
        }
      });
    });
  }

  return {
    create:              create,
    readById:            readById,
    readList:            readList,
    updateEntry:         updateEntry,
    adminRequiredUpdate: adminRequiredUpdate,
    deleteEntry:         deleteEntry,

  }
}

module.exports = registryHelper;
