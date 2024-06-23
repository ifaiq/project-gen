import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MongooseModule.forRoot("mongodb+srv://admin:Pr0f0unD@cluster.aqbn3zf.mongodb.net/"
      , { dbName: 'project_gen' }),
  ],
  controllers: [AppController],
})
export class AppModule { }
