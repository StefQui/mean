'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Orga Schema
 */
var OrgaSchema = new Schema({
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
  }
  // templates: [
  // { type: Schema.ObjectId, ref: 'Template' }
  // ]
});

mongoose.model('Orga', OrgaSchema);
