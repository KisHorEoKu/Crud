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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tiger',
      database: 'crud', 
      entities: [Student,Sports,user,form],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Student,user,form]),
    
  ],
  controllers: [StudentController, UserController, FormController, SessionController],
  providers: [StudentService, UserService, FormService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(ValidationPipe).forRoutes(StudentController);
  // }
}
