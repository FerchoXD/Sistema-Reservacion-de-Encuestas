import { AwardModel } from "../../../UserManagment/Infraestructure/Database/Models/MySQL/AwardModel";
import { InvitationModel } from "../../../UserManagment/Infraestructure/Database/Models/MySQL/InvitationModel";
import { OptionModel } from "../../../UserManagment/Infraestructure/Database/Models/MySQL/OptionModel";
import { ParticipantModel } from "../../../UserManagment/Infraestructure/Database/Models/MySQL/ParticipantModel";
import { QuestionModel } from "../../../UserManagment/Infraestructure/Database/Models/MySQL/QuestionModel";
import { ResponseParticipantModel } from "../../../UserManagment/Infraestructure/Database/Models/MySQL/ResponseParticipantModel";
import { SurveyModel } from "../../../UserManagment/Infraestructure/Database/Models/MySQL/SurveyModel";

// Relaciones SurveyModel - QuestionModel
// Una encuesta puede tener muchas preguntas. Relación Uno a Muchos.
SurveyModel.hasMany(QuestionModel, { foreignKey: 'surveyUuid', as: 'questions' });
QuestionModel.belongsTo(SurveyModel, { foreignKey: 'surveyUuid' });

// Relaciones QuestionModel - OptionModel
// Una pregunta puede tener muchas opciones. Relación Uno a Muchos.
QuestionModel.hasMany(OptionModel, { foreignKey: 'questionUuid', as: 'options' });
OptionModel.belongsTo(QuestionModel, { foreignKey: 'questionUuid' });

// Relaciones para Invitation
// Un participante puede recibir muchas invitaciones. Relación Uno a Muchos.
ParticipantModel.hasMany(InvitationModel, { foreignKey: 'participantUuid', as: 'invitations' });
// Una invitación está asociada a un único participante.
InvitationModel.belongsTo(ParticipantModel, { foreignKey: 'participantUuid' });

// Una encuesta puede estar asociada a muchas invitaciones. Relación Uno a Muchos.
SurveyModel.hasMany(InvitationModel, { foreignKey: 'surveyUuid', as: 'invitations' });
// Una invitación está asociada a una única encuesta.
InvitationModel.belongsTo(SurveyModel, { foreignKey: 'surveyUuid' });

// Relaciones para ResponseParticipant
// Un participante puede tener muchas respuestas. Relación Uno a Muchos.
ParticipantModel.hasMany(ResponseParticipantModel, { foreignKey: 'participantUuid', as: 'responses' });
// Una respuesta está asociada a un único participante.
ResponseParticipantModel.belongsTo(ParticipantModel, { foreignKey: 'participantUuid' });

// Una pregunta puede recibir muchas respuestas. Relación Uno a Muchos.
QuestionModel.hasMany(ResponseParticipantModel, { foreignKey: 'questionUuid', as: 'responses' });
// Una respuesta está asociada a una única pregunta.
ResponseParticipantModel.belongsTo(QuestionModel, { foreignKey: 'questionUuid' });

// Una opción puede ser seleccionada en muchas respuestas. Relación Uno a Muchos.
OptionModel.hasMany(ResponseParticipantModel, { foreignKey: 'optionUuid', as: 'responses' });
// Una respuesta selecciona una única opción (o ninguna, si es nula).
ResponseParticipantModel.belongsTo(OptionModel, { foreignKey: 'optionUuid', as: 'selectedOption' });

// Relación SurveyModel - Award (Uno a Muchos)
// Una encuesta puede tener asociados muchos premios. Relación Uno a Muchos.
SurveyModel.hasMany(AwardModel, { foreignKey: 'surveyUuid', as: 'awards' });
// Un premio está asociado a una única encuesta.
AwardModel.belongsTo(SurveyModel, { foreignKey: 'surveyUuid' });

