import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.session.user) {
      const {id , email} = req.body;
      req.session.user = {
        id:id +'',
        email :email  + ''
      };
      alert("session created")
    }
    next();
  }
}