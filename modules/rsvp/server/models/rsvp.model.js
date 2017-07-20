'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var RsvpSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  attending: {
    type: boolean,
    default: true
  },
  note: {
    type: string
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Rsvp", RsvpSchema, "rsvps");