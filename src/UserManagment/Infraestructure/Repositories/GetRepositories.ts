import { DatabaseType } from "../dependencies";
import { InvitationMongoRepository } from "./MongoDB/InvitationMongoRepository";
import { ParticipantMongoRepository } from "./MongoDB/ParticipantMongoRepository";
import { SurveyMongoRepository } from "./MongoDB/SurveyMongoRepository";
import { UserMongoRepository } from "./MongoDB/UserMongoRepository";
import { InvitationMySQLRepository } from "./MySQL/InvitationMySQLRepository";
import { ParticipantMySQLRepository } from "./MySQL/ParticipantMySQLRepository";
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