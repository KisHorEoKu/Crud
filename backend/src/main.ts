import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser'
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  app.use(
    session({
      secret:process.env.SESSION_SECRET  || crypto.randomBytes(32).toString('hex'),  
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false,httpOnly:true },  
    })
  );
  
  await app.listen(process.env.PORT || 3000);  
  
}
bootstrap();
