import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),  // Load environment variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        const uri = isProduction
          ? configService.get<string>('MONGODB_URI_PROD')  // Mongo URI for production
          : configService.get<string>('MONGODB_URI_DEV');  // Mongo URI for development

        console.log(`Connecting to ${isProduction ? 'Production' : 'Development'} Database`);

        return {
          uri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
