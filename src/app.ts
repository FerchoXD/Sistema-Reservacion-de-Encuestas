import "reflect-metadata";
import 'dotenv/config';
import express from 'express';
import { initializeApp } from "./UserManagment/Infraestructure/dependencies";
import userRouter from "./UserManagment/Infraestructure/Routes/UserRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const setupServer = async () => {
    try {
        const { 
          registerUserController, activateUserController, loginUserController, logoutUserController, 
          createSurveyAndQuestionAndAwardsController
        } = await initializeApp();

        
        app.use('/api/v1/users', userRouter(
          registerUserController, activateUserController, loginUserController, logoutUserController,
          createSurveyAndQuestionAndAwardsController
          )
        );

        app.listen(port, () => {
            console.log(`Servidor escuchando en http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error durante la inicialización de la aplicación:", error);
    }
};

setupServer();
