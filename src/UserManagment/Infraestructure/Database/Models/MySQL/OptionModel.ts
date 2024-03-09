import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class OptionModel extends Model {
    public uuid!: string;
    public optionText!: string;
    public value!: number;
    public questionUuid!: string;
}

OptionModel.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  optionText: { type: DataTypes.STRING },
  value: { type: DataTypes.INTEGER },
  questionUuid: { type: DataTypes.UUID }
}, { sequelize, modelName: 'option' });
