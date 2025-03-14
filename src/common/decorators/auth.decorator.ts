import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from '../guards/auth.guard';

export const Auth = () => UseGuards(UserAuthGuard);
