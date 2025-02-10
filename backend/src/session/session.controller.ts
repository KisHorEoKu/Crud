import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('session')
export class SessionController {

  @Get('set')
  setSession(@Req() request: Request): string {
    request.session.user = 'John Doe';  
    return 'Session data set';
  }

  @Get('get')
  getSession(@Req() request: Request): string {
    const user = request.session.user;  
    return user ? `User is ${user}` : 'No user in session';
  }
}
