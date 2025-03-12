import { Request } from 'express';
import { User } from '../user/user.interface';

export interface CustomRequest extends Request {
  user: User;
}
