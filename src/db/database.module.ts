import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        const uri = isProduction
          ? configService.get<string>('MONGODB_URI_PROD')
          : configService.get<string>('MONGODB_URI_DEV');

        console.log(`Connecting to ${isProduction ? 'Production' : 'Local'} database`);

        return {
          uri,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
