import { DatabaseType } from "../dependencies";
import { InvitationMongoRepository } from "./MongoDB/InvitationMongoRepository";
import { OptionMongoRepository } from "./MongoDB/OptionMongoRepository";
import { ParticipantMongoRepository } from "./MongoDB/ParticipantMongoRepository";
import { QuestionMongoRepository } from "./MongoDB/QuestionMongoRepository";
import { ResponseMongoRepository } from "./MongoDB/ResponseMongoRepository";
import { SurveyMongoRepository } from "./MongoDB/SurveyMongoRepository";
import { UserMongoRepository } from "./MongoDB/UserMongoRepository";
import { InvitationMySQLRepository } from "./MySQL/InvitationMySQLRepository";
import { OptionRepository } from "./MySQL/OptionRepository";
import { ParticipantMySQLRepository } from "./MySQL/ParticipantMySQLRepository";
import { QuestionRepository } from "./MySQL/QuestionRepository";
import { ResponseRepository } from "./MySQL/ResponseRepository";
import { SurveyMySQLRepository } from "./MySQL/SurveyMySQLRespository";
import { UserMySqlRepository } from "./MySQL/UserMySqlRepository";

export function getUserRepository(dbType: DatabaseType): UserMySqlRepository | UserMongoRepository {
    if (dbType === 'MySQL') return new UserMySqlRepository();
    else return new UserMongoRepository();
}

export function getSurveyRepository(dbType: DatabaseType): SurveyMySQLRepository | SurveyMongoRepository {
    if (dbType === 'MySQL') return new SurveyMySQLRepository();
    else return new SurveyMongoRepository();
}

export function getParticipantRepository(dbType: DatabaseType) : ParticipantMySQLRepository | ParticipantMongoRepository {
    if (dbType === 'MySQL') return new ParticipantMySQLRepository();
    else return new ParticipantMongoRepository();
}

export function getInvitationRepository(dbType: DatabaseType) : InvitationMySQLRepository | InvitationMongoRepository {
    if (dbType === 'MySQL') return new InvitationMySQLRepository();
    else return new InvitationMongoRepository();
}

export function getQuestionRepository(dbType:DatabaseType) : QuestionRepository | QuestionMongoRepository {
    if (dbType === 'MySQL') return new QuestionRepository();
    else return new QuestionMongoRepository();
}

export function getOptionRepository(dbType:DatabaseType) : OptionRepository | OptionMongoRepository  {
    if (dbType === 'MySQL') return new OptionRepository();
    else return new OptionMongoRepository();
}

export function getResponseRepository(dbType:DatabaseType) : ResponseRepository | ResponseMongoRepository {
    if (dbType === 'MySQL') return new ResponseRepository();
    else return new ResponseMongoRepository();
}