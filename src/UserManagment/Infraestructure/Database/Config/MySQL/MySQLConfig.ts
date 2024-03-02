import { DatabaseConfig } from '../DatabaseConfig';
import { AppDataSource } from './database';

export class MySQLConfigORM implements DatabaseConfig {
  async initialize(): Promise<void> {
    AppDataSource.initialize().then(() => {
        console.log("Data Source MySQL has been initialized!");
    }).catch((error) => {
        console.error("Error during Data Source initialization:", error);
    });
  }
}
