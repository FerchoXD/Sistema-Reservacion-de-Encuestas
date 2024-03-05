import sequelize from './database';
import { DatabaseConfig } from '../DatabaseConfig';
import "../../Config/MySQL/Asociations";

export class MySQLConfig implements DatabaseConfig {
  async initialize(): Promise<void> {
    await sequelize.sync({ force: false });
    console.log('MySQL database synchronized.');
  }
}