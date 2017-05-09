var galleryModel = require('./models/gallery.model.js');

var galleryCtrl = require('./controllers/gallery.controller.js');

function galleryModule([logger, shared]) {
  var galleryController = new galleryCtrl(logger, shared);

  return galleryController;
}

module.exports = galleryModule;
