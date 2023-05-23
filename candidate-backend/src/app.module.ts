import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { MailingModule } from './mailing/mailing.module'
import { PeriodsModule } from './periods/periods.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PeriodsModule,
    MailingModule.forRoot({
      templates: {
        default: process.env.MAIL_TEMPLATE_ROOT + 'requestFulfilled.ejs',
      },
      mailServerUrl: process.env.MAIL_SERVER_URL,
      apiKey: process.env.MAIL_API_KEY,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
