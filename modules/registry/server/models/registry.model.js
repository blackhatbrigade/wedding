'use strict';

/**
 * Dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * registry Schema.
 *
 * @see http://mongoosejs.com/docs/guide.html - For basic schema information.
 * @see http://mongoosejs.com/docs/schematypes.html - For schema type information.
 */
var registrySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  reserved: {
    type: Boolean,
    required: true,
    default: false
  },
  reservedBy: {
    type: Schema.Types.ObjectId,
    required: false
  },
  url: {
    type: String,
    required: false,
    default: ''
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  pic: {
    type: String,
    required: false,
    default: ''
  }
});

mongoose.model('registry', registrySchema);
