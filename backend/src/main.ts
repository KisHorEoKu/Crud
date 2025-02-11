import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import secureSession from '@fastify/secure-session';
import * as crypto from 'crypto';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Generating a 32-byte secret from a passphrase
  const passphrase = process.env.SESSION_SECRET || 'your_secure_passphrase';
  const sessionSecret = crypto.createHash('sha256').update(passphrase).digest().slice(0, 32); // 32-byte secret

  await app.register(secureSession, {
    secret: sessionSecret,  // Passing a valid 32-byte buffer
    salt: 'mq9hDxBVDbspDR6n',
  });

  await app.listen(process.env.PORT_NUMBER || 5000);
}
bootstrap();
