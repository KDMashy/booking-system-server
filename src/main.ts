import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { getRepository } from 'typeorm';
import { SessionEntity } from './modules/typeorm/session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(SessionEntity);
  app.use(session({
    name: 'BOOKING_SYSTEM_SESSION',
    secret: 'DefinietlyNotABookingServerSessionSecretThisIS',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000000,
    },
    store: new TypeormStore().connect(sessionRepository),
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
