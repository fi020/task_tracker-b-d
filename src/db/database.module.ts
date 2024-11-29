import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure environment variables are loaded
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        const uri = isProduction
          ? configService.get<string>('MONGODB_URI_PROD')  // Production Mongo URI
          : configService.get<string>('MONGODB_URI_DEV');  // Development Mongo URI

        console.log(`Connecting to ${isProduction ? 'Production' : 'Development'} Database`);

        return { uri }; // Only pass the URI, no need for useNewUrlParser, useUnifiedTopology
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
