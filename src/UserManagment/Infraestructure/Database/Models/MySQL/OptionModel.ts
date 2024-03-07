import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class OptionModel extends Model {}

OptionModel.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  optionText: { type: DataTypes.STRING },
  value: { type: DataTypes.INTEGER },
  questionUuid: { type: DataTypes.UUID }
}, { sequelize, modelName: 'option' });
