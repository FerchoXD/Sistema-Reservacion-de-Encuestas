import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('cah_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
