import mongoose, { Schema } from "mongoose";

const ParticipantResponseSchema = new Schema({
    participantId: { type: Schema.Types.ObjectId, ref: 'Participant' },
    surveyId: { type: Schema.Types.ObjectId, ref: 'Survey' },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
    answer: String,
    selectedOptionId: { type: Schema.Types.ObjectId },
});

const ResponseModel = mongoose.model('Responses', ParticipantResponseSchema);

export default ResponseModel;