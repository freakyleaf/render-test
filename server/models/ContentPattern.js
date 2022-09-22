import mongoose from 'mongoose';

const contentPatternSchema = mongoose.Schema({
    content: {
        type: String,
    },
    reference: {
        type: String,
    },
});

export default contentPatternSchema;
