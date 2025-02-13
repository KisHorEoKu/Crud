import { Session, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as crypto from 'crypto';
import * as cookieParser from 'cookie-parser';
import cron from 'node-cron';
import { LessThan, Repository } from 'typeorm';


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(cookieParser());

  // const passphrase = process.env.SESSION_SECRET || 'your_secure_passphrase';
  // const sessionSecret = crypto.createHash('sha256').update(passphrase).digest().slice(0, 32);
  app.use(
    session({
      secret: 'QWERTYUIOSDFGHJKLXCVBNM', 
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false ,maxAge:10000},
    }),
  );

  // cron.schedule('* * * * *', async () => {
  //   const currentTime = new Date();
  //   const sessionRepository = Repository(Session);
  
  //   try {
  //     // Delete sessions that have expired
  //     await sessionRepository.delete({
  //       expireTime: LessThan(currentTime),
  //     });
  //     console.log('Expired sessions deleted.');
  //   } catch (error) {
  //     console.error('Error deleting expired sessions:', error);
  //   }
  // });

  await app.listen(process.env.PORT_NUMBER || 5000);
}
bootstrap();
