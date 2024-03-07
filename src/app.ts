import express from 'express';
import userRouter from "./UserManagment/Infraestructure/Routes/UserRoutes"
import surveyRouter from './UserManagment/Infraestructure/Routes/SurveyRoutes';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/surveys', surveyRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});