import mongoose, { Schema } from "mongoose";

const InvitationSchema = new Schema({
    uuid: { type: String, require:true, unique:true },
    participantUuid:  { type: String, required:true, unique:true },
    surveyUuid:  { type: String, required:true, unique:true },
    state: { type: String, enum: ['SEND', 'ACCEPTED', 'COMPLETED'] },
    token: { type:String, require:true, unique:true }
  });
  
const InvitationModel = mongoose.model('Invitation', InvitationSchema);

export default InvitationModel;  