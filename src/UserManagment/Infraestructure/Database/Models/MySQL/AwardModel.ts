import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class AwardModel extends Model {
    public uuid!: string;
    public productName!: string;
    public productDescription!: string;
    public stock!: number;
    public surveyUuid!: string;
}

AwardModel.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  productName: { type: DataTypes.STRING },
  productDescription: { type: DataTypes.STRING },
  stock: { type: DataTypes.INTEGER },
  surveyUuid: { type: DataTypes.UUID }
}, { sequelize, modelName: 'award' });
