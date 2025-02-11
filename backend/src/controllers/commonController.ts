import { createHash } from "crypto";
import * as bcrypt from 'bcryptjs';

export class commonController{

       async hashPassword(password: string): Promise<string> {
        const hash = createHash('sha256');
        hash.update(password);
        return  hash.digest('hex');
      }

     

}