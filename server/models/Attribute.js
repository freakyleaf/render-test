import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import ContentPatternSchema from './ContentPattern.js';
import ReferenceSchema from './Reference.js';
import ValueValueSchema from './ValueValue.js';

const AttributeSchema = mongoose.Schema({
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
    since: {
        type: String,
        required: true,
    },
    subtypes: {
        type: Array,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    typeAlsoGlobal: {
        type: Boolean,
    },
    valueTypes: {
        type: Array,
        requried: true,
    },
    valueValues: [
        ValueValueSchema,
    ],
});

AttributeSchema.plugin(uniqueValidator);

export default mongoose.model('Attribute', AttributeSchema);
