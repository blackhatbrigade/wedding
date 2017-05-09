'use strict';

/**
 * Dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * gallery Schema.
 *
 * @see http://mongoosejs.com/docs/guide.html - For basic schema information.
 * @see http://mongoosejs.com/docs/schematypes.html - For schema type information.
 */
var gallerySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

mongoose.model('gallery', gallerySchema);
