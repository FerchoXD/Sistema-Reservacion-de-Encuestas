// src/Infrastructure/Repositories/SurveyMySQLRepository.ts

import { EntityRepository, Repository } from 'typeorm';
import { SurveyModel } from '../Database/Models/MySQL/SurveyModel';
import { SurveyInterface } from '../../Domain/Ports/SurveyInterface';
import { Survey } from '../../Domain/Entitys/Survey';

@EntityRepository(SurveyModel)
export class SurveyMySQLRepository extends Repository<SurveyModel> implements SurveyInterface {
    async addSurvey(survey: Survey): Promise<Survey> {
        const surveyModel = new SurveyModel();
        surveyModel.title = survey.title;
        surveyModel.description = survey.description;
        surveyModel.uuid = survey.uuid;
        
        const savedSurveyModel = await this.save(surveyModel); // Usa this.save directamente si estás dentro de Repository
        

        const savedSurvey = new Survey(savedSurveyModel.title, savedSurveyModel.description, []);
        
        return savedSurvey;
    }
}
