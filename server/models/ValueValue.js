import mongoose from 'mongoose';

const ValueValueSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    example: {
        type: String,
    },
});

export default ValueValueSchema;
