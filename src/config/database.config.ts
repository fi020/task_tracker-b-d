// src/config/database.config.ts
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

// export const databaseConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
//   uri: configService.get<string>('MONGO_URI'),  // Mongo URI from environment
//   authSource: 'admin',  // Authentication source (optional)
//   retryWrites: true,  // Enable retry writes (optional)
  
//   // Optional SSL/TLS options for production setups (e.g., MongoDB Atlas)
//   ssl: true,  // Enables SSL (if using a production DB like MongoDB Atlas)
//   sslValidate: false,  // Disable certificate validation if you don't have a proper certificate (can be true if you have one)
//   sslCA: [],  // Provide a custom Certificate Authority if necessary (e.g., MongoDB Atlas)
//   sslCert: '',  // Client certificate, if needed
//   sslKey: '',  // Client key, if needed
// });

// Without SSL options
export const databaseConfig = async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
    uri: configService.get<string>('MONGODB_URI_PROD'),  // Mongo URI from environment
    authSource: 'admin',
    retryWrites: true,
  });
  