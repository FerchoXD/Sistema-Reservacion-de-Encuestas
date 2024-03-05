import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class SurveyModel extends Model {}

SurveyModel.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING }
}, { sequelize, modelName: 'survey' });