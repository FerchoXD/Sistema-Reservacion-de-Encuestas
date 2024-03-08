import mongoose, { Schema } from "mongoose";

const InvitationSchema = new Schema({
    uuid: { type: String, require:true, unique:true },
    participantUuid:  { type: String, required:true, unique:true },
    surveyUuid:  { type: String, required:true, unique:true },
    status: { type: String, enum: ['SENT', 'ACCEPTED', 'COMPLETED'] },
    token: { type:String, require:true, unique:true }
  });
  
const InvitationModel = mongoose.model('Invitation', InvitationSchema);

export default InvitationModel;  