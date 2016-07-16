'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Template Schema
 */
var Templateschema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  shortName: {
    type: String,
    default: '',
    trim: true,
    required: 'ShortName cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  orga: {
    type: Schema.ObjectId,
    ref: 'Orga'
  }
});

mongoose.model('Template', Templateschema);
