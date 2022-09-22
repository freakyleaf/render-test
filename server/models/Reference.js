import mongoose from 'mongoose';

const ReferenceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

export default ReferenceSchema;
