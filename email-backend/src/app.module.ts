import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { MailingModule } from './mailing/mailing.module'
import { MailingService } from './mailing/mailing.service'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    MailingModule.forRoot({
      mailServerUrl: process.env.MAIL_SERVER_URL,
      apiKey: process.env.MAIL_API_KEY,
    }),
  ],
  controllers: [AppController],
  providers: [MailingService],
})
export class AppModule {}
