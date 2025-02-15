import { Controller, Post } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Controller()
export class MailController {
    constructor(private readonly appService: AppService){}

}
