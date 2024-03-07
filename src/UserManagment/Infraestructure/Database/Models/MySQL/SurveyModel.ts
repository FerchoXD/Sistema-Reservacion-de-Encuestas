import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

interface ISurveyAttributes {
  uuid: string;
  title: string;
  status: 'ENABLED' | 'DISABLED';
  description: string;
}

export class SurveyModel extends Model<ISurveyAttributes> implements ISurveyAttributes {
  public uuid!: string;
  public title!: string;
  public status!: 'ENABLED' | 'DISABLED';
  public description!: string;
}

SurveyModel.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('ENABLED', 'DISABLED'), defaultValue: 'DISABLED' },
  description: { type: DataTypes.STRING },
}, { sequelize, modelName: 'survey' });
