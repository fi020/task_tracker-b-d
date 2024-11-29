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
        uri: configService.get<string>('MONGO_URI'),
        useNewUrlParser: true,  // Recommended for MongoDB
        useUnifiedTopology: true,  // Avoid deprecation warnings
        retryWrites: true,  // Optional: Enable retrying writes
        // Add any other necessary MongoDB options here
      }),
    }),
  ],
})
export class DbModule {}
