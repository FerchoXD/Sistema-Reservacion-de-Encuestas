import "reflect-metadata";
import express from 'express';
import userRouter from "./UserManagment/Infraestructure/Routes/UserRoutes"

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
