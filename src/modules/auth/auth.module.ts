import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './service/auth/auth.service';
import { LocalStrategy } from './utils/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
  ],

})
export class AuthModule {}
