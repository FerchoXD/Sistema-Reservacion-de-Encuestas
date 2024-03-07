import mongoose, { Schema } from "mongoose";

const OptionSchema = new Schema({
    uuid: { type: String, required:true, unique:true },
    optionText: String,
    value: Number
});
  
const QuestionSchema = new Schema({
    uuid: { type: String, required:true, unique:true },
    questionText: String,
    type: { type: String, enum: ['OPEN', 'MULTIPLE_CHOICE'] },
    options: [OptionSchema],
});
  
const SurveySchema = new Schema({
    uuid: { type: String, required:true, unique:true },
    title: String,
    description: String,
    status: { type: String, enum: ['ENABLED', 'DISABLED'] },
    questions: [QuestionSchema],
});

const SurveyModel = mongoose.model('Survey', SurveySchema);
export default SurveyModel;