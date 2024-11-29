import { Module } from '@nestjs/common';
// import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule],  // Import DbModule and UserModule
})
export class AppModule {}
