import { Model, DataTypes, UUIDV4 } from 'sequelize';
import sequelize from '../../../../../Database/Config/MySQL/database';

export class SurveyModel extends Model {
    public uuid!: string; // Asume que cada encuesta tiene un UUID único
    public title!: string; // El título de la encuesta
    public status!: 'ENABLED' | 'DISABLED'; // El estado de la encuesta, puede ser 'ENABLED' o 'DISABLED'
    public description!: string; // Una descripción de la encuesta
}

SurveyModel.init({
  uuid: { 
    type: DataTypes.UUID, 
    defaultValue: UUIDV4, 
    primaryKey: true 
  },
  title: { 
    type: DataTypes.STRING 
  },
  status: { 
    type: DataTypes.ENUM('ENABLED', 'DISABLED'), 
    defaultValue: 'DISABLED' 
  },
  description: { 
    type: DataTypes.STRING 
  },
}, { 
  sequelize, 
  modelName: 'survey'
});
