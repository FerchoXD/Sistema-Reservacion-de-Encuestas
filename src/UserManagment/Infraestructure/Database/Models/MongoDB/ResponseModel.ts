import mongoose, { Schema } from "mongoose";

const ParticipantResponseSchema = new Schema({
    uuid:String,
    participantUuid: String,
    optionUuid: String,
    questionUuid: String,
    answer: String,
    score: Number,
});

const ResponseModel = mongoose.model('Responses', ParticipantResponseSchema);

export default ResponseModel;