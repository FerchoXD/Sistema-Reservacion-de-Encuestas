import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class QuestionModel extends Model {}

QuestionModel.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  questionText: { type: DataTypes.STRING },
  type: { type: DataTypes.ENUM, values: ['OPEN', 'MULTIPLE_CHOICE'] },
  surveyUuid: { type: DataTypes.UUID }
}, { sequelize, modelName: 'question' });
