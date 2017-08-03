'use strict';

/**
 * Module dependencies.
 */
var ObjectId = require ('bson-objectid');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Rsvp Schema
 */
var RsvpSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  attending: {
    type: Boolean,
    default: true
  },
  partyMembers: {
    type: [String],
    default: []
  },
  
  partySize: {
    type: Number,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Rsvp", RsvpSchema, "rsvps");