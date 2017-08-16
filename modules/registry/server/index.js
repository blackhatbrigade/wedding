var registryModel = require('./models/registry.model.js');

var registryCtrl = require('./controllers/registry.controller.js');

var registryHelper = require('./controllers/registry-helper.js');

function registryModule([logger, users]) {
  var registryController = new registryCtrl(logger, users, new registryHelper(logger));

  return registryController;
}

module.exports = registryModule;
