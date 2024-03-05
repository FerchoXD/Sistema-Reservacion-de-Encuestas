import { DataSource } from 'typeorm';
import { SurveyModel } from '../../Models/MySQL/SurveyModel';
import { Award } from '../../Models/MySQL/AwardModel';
import { Invitation } from '../../Models/MySQL/InvitationModel';
import { Option } from '../../Models/MySQL/OptionModel';
import { Participant } from '../../Models/MySQL/ParticipantModel';
import { QuestionModel } from '../../Models/MySQL/QuestionModel';
import { ResponseParticipant } from '../../Models/MySQL/ResponseParticipantModel';

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
    entities: [
        SurveyModel, Award, Invitation, Option, Participant, QuestionModel, ResponseParticipant
    ],
    migrations: [
    ],
    subscribers: [
    ],
});