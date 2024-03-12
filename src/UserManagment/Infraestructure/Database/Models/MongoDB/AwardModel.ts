import mongoose, { Schema } from "mongoose";

const AwardSchema = new Schema({
    uuid: { type: String, require:true, unique:true },
    productName: String,
    productDescription: String,
    stock: Number,
    surveyUuid:{ type: String },
});

const AwardModel = mongoose.model('Award', AwardSchema);
export default AwardModel;