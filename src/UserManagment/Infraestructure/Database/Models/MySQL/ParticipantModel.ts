import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class Participant extends Model {}

Participant.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING }
}, { sequelize, modelName: 'participant' });