import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormController } from './form.controller';
import { form } from 'src/entity/form';

// @Module({
//   providers: [FormService],
//   exports: [FormService],
// })


@Module({
  imports: [
    TypeOrmModule.forFeature([form]), 
  ],
  providers: [FormService],
  controllers: [FormController],
})
export class FormModule {}