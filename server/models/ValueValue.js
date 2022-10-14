import mongoose from 'mongoose';

const ValueValueSchema = mongoose.Schema({
    example: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
});

export default ValueValueSchema;
