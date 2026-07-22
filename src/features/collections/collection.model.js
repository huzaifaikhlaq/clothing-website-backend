import { mongoose } from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;