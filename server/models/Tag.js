import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import ContentPatternSchema from './ContentPattern.js';
import ReferenceSchema from './Reference.js';

const AttributeSchema = mongoose.Schema({
    _id: {
        type: String,
    },
    isActive: {
        type: Boolean,
    },
    name: {
        type: String,
    },
    subform: {
        type: Object,
    },
    subtype: {
        type: String,
    },
    type: {
        type: String,
    },
});

const TagSchema = mongoose.Schema({
    attributes: [
        AttributeSchema,
    ],
    contentPatterns: [
        ContentPatternSchema,
    ],
    datePublished: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
    },
    description: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    notes: {
        type: String,
    },
    notesOpinionated: {
        type: Boolean,
    },
    references: [
        ReferenceSchema,
    ],
    subtype: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
});

TagSchema.plugin(uniqueValidator);

export default mongoose.model('Tag', TagSchema);
