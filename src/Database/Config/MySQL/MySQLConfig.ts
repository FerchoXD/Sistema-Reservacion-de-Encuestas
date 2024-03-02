import { createConnection } from 'typeorm';
import { DatabaseConfig } from '../DatabaseConfig';

export class MySQLConfig implements DatabaseConfig {
  async initialize(): Promise<void> {
    try {
      await createConnection(); // Utiliza ormconfig.json por defecto
      console.log('MySQL database initialized with TypeORM.');
    } catch (error) {
      console.error('Error during TypeORM connection:', error);
    }
  }
}
