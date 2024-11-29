// src/config/database.config.ts
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
  uri: configService.get<string>('MONGODB_URI_PROD'),  // Mongo URI from environment
  authSource: 'admin',  // Authentication source (optional, if needed)
  retryWrites: true,  // Enable retry writes (optional)
});
