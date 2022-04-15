import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { LocalStrategy } from './utils/local.strategy';
import { SessionSerializer } from './utils/session.serializer';

@Module({
  imports: [
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
  ],

})
export class AuthModule {}
