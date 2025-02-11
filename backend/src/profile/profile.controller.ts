import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport'; // Use Passport's AuthGuard

@Controller('profile')
export class ProfileController {

  @UseGuards(AuthGuard('local')) 
  @Get()
  async getProfile(@Req() req: Request): Promise<any> {
    if (req.session && req.session.user) {
      return { message: 'Authenticated', user: req.session.user };
    } else {
      return { message: 'No session found, please log in.' };
    }
  }
}
