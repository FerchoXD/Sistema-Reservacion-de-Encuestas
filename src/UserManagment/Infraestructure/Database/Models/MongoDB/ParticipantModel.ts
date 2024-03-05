import mongoose, { Schema } from "mongoose";

const ParticipantSchema = new Schema({
    id: { type: String, require:true, unique:true },
    name: String,
    email: String,
});

const ParticipantModel = mongoose.model('Participant', ParticipantSchema);
export default ParticipantModel;
