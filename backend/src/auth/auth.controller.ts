import { Controller, Get, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('login') 
  login(@Req() req: Request, @Res() res: Response) {
    const { id , email }  = req.body;
     req.session.user = {
      id: id +'',
      email: email+'',  
    };
    console.log(req.session.user);
    
    res.cookie('user_id', id, {
      httpOnly: true, 
      secure: false,
      maxAge: 10000,
    });
  
  }

  @Get('profile')
  profile(@Req() req: Request): string {
    if (req.session.user) {
      console.log(req.session.user)
      return `Hello, ${req.session.user.email}`;
    }
    return 'No user logged in!';
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response): string {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('Could not log out.');
      } else {
        res.send('Logged out successfully!');
      }
    });
    return '';
  }
}