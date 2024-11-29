import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DatabaseModule } from './db/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make environment variables available globally
    }),
    // DatabaseModule
    // MongooseModule.forRoot(process.env.MONGODB_URI_PROD),

    MongooseModule.forRootAsync({
        imports: [ConfigModule], // no need to import if `ConfigModule` is global true
        useFactory: (config: ConfigService) => { // this function can be async as well
          // const username = config.get("DATABASE_USER");
          // const password = config.get("DATABASE_PASSWORD");
          // const host = config.get("DATABASE_HOST");
          // const port = config.get("DATABASE_PORT");
          // const db = config.get("DATABASE_NAME");
          // const isLocal = config.get("NODE_ENV") === "LOCAL";
          
          const uri = process.env.MONGODB_URI_PROD;
          // const uri = isLocal
          //   ? `mongodb://localhost:${port}/${db}`
          //   : `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;
      
          return {
            uri,
          };
        },
        inject: [ConfigService],
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
