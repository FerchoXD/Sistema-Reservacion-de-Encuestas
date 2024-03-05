import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class Invitation extends Model {}

Invitation.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  state: { type: DataTypes.ENUM, values: ['SEND', 'ACCEPTED', 'COMPLETED'] }
}, { sequelize, modelName: 'invitation' });

