import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('surveys_hexagonal_architecture', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;