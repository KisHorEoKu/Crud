import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const cookies = req.cookies;

    
    // console.log('Cookies:', cookies);

    // const token = req.cookies['token']; 
    // console.log('Token:', token);

    // if (!token) {
    //   return res.status(401).json({ message: 'No token found' });
    // }

    next(); 
  }
}