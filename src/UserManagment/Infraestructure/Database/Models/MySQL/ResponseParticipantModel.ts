import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class ResponseParticipantModel extends Model {
    public uuid!: string;
    public textAnswer!: string | null;
    public score!: number | null;
    public participantUuid!:string;
    public questionUuid!: string;
    public optionUuid!:string;
}

ResponseParticipantModel.init({
  uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
  textAnswer: { type: DataTypes.STRING, allowNull: true },
  score: { type: DataTypes.INTEGER, allowNull: true },
  participantUuid: { type:DataTypes.UUID },
  questionUuid: { type:DataTypes.UUID },
  optionUuid: { type:DataTypes.UUID },
}, { sequelize, modelName: 'response' });
