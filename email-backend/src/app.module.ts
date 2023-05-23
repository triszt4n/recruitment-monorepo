import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { MailingModule } from './mailing/mailing.module'
import { MailingService } from './mailing/mailing.service'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    MailingModule.forRoot({
      mailServerUrl: process.env.MAIL_SERVER_URL,
      apiKey: process.env.MAIL_API_KEY,
    }),
  ],
  providers: [MailingService],
})
export class AppModule {}
