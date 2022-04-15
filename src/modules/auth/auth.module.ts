import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/service/user.service';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { LocalStrategy } from './utils/localStrategy';

@Module({
  controllers: [
    AuthController,
    PassportModule,
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
  ],

})
export class AuthModule {}
