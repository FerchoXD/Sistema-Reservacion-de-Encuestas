import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class ResponseParticipant extends Model {
    public uuid!: string;
    public textAnswer!: string | null;
    public optionUuid!: string | null;
}

ResponseParticipant.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  textAnswer: { type: DataTypes.STRING, allowNull: true },
  optionUuid: { type: DataTypes.UUID, allowNull: true }
}, { sequelize, modelName: 'response' });
