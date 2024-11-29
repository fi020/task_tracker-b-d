import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes the configuration globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
        uri: configService.get<string>('MONGODB_URI_PROD'),
        retryWrites: true,  // Optional: Enable retrying writes
        // Additional options can go here if needed
      }),
    }),
  ],
})
export class DbModule {}
