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
          ? configService.get<string>('MONGODB_URI_PROD') // Remote MongoDB URI
          : configService.get<string>('MONGODB_URI_DEV'); // Local MongoDB URI
        
        console.log(`Connecting to ${isProduction ? 'Production' : 'Local'} database`);

        return {
          uri,
          useNewUrlParser: true, // Ensure compatibility with modern MongoDB drivers
          useUnifiedTopology: true, // Enable the new server discovery and monitoring engine
        };
      },
    }),
  ],
})
export class DatabaseModule {}
