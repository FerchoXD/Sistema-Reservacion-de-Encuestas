import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class ParticipantModel extends Model {
    public uuid!: string;
    public name!: string;
    public email!: string;
}

ParticipantModel.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING }
}, { sequelize, modelName: 'participant' });
