import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class InvitationModel extends Model {}

InvitationModel.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  state: { type: DataTypes.ENUM, values: ['SEND', 'ACCEPTED', 'COMPLETED'] },
  token: { type:DataTypes.STRING },
  participantUuid: { type:DataTypes.UUID },
  surveyUuid: { type:DataTypes.UUID }
}, { sequelize, modelName: 'invitation' });

