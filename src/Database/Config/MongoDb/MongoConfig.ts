import { DatabaseConfig } from '../DatabaseConfig';
import connectMongoDB from './database';

export class MongoConfig implements DatabaseConfig {
  async initialize(): Promise<void> {
    await connectMongoDB()
    console.log('MongoDB database synchronized.');
  }
}