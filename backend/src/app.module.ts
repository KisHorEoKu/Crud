// src/app.module.ts
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entity/Student';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { Sports } from './entity/sports';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { user } from './entity/user';
import { FormController } from './form/form.controller';
import { FormService } from './form/form.service';
import { form } from './entity/form';
import { SessionController } from './session/session.controller';
import { ProfileController } from './profile/profile.controller';
// import { FormModule } from './form/form.module';
import { AuthController } from './auth/auth.controller';
import { SessionMiddleware } from './session/session.middleware';
import { Session } from './entity/session';
import { SessionService } from './session/session.service';
import { Otp } from './entity/otp';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail/mail.controller';
import { AppService } from './app.service';
import { Token } from './entity/token';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tiger',
      database: 'crud', 
      entities: [Student,Sports,user,form,Session,Otp,Token],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Student,user,form,Session,Otp,Token]),
    // MailModule setup
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',  
        port: 587,                 
        secure: false,            
        auth: {
          user: 'kishorednmgroup@gmail.com', 
          pass: 'sgpu poph noxt tqwb',   
        },
      },
      defaults: {
        from: '"Application" <no-reply@example.com>',  
      },
     
    }),
    ScheduleModule.forRoot(
      
    )

 
    
  ],
  controllers: [StudentController, UserController, FormController, SessionController, ProfileController, AuthController, MailController],
  providers: [StudentService, UserService, FormService, SessionService,AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('/','/login');
  }
}
