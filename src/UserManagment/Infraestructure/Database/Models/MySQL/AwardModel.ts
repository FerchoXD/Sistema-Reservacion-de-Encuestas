import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class AwardModel extends Model {}

AwardModel.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  productName: { type: DataTypes.STRING },
  productDescription: { type: DataTypes.STRING },
  stock: { type: DataTypes.INTEGER },
  surveyUuid: { type: DataTypes.UUID }
}, { sequelize, modelName: 'award' });
