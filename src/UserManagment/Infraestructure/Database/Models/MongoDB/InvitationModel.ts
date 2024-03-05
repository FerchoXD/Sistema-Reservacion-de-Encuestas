import mongoose, { Schema } from "mongoose";

const InvitationSchema = new Schema({
    id: { type: String, require:true, unique:true },
    participantId: { type: Schema.Types.ObjectId, ref: 'Participant' },
    surveyId: { type: Schema.Types.ObjectId, ref: 'Survey' },
    status: { type: String, enum: ['SENT', 'ACCEPTED', 'COMPLETED'] },
  });
  
const InvitationModel = mongoose.model('Invitation', InvitationSchema);

export default InvitationModel;  