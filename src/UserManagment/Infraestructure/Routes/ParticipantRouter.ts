import { Router } from "express";
import { registerParticipantController } from "../dependencies";

const participantRouter = Router();

participantRouter.post('/save', registerParticipantController.run.bind(registerParticipantController));

export default participantRouter;