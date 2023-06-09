import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { AuthModule } from './auth/auth.module'
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
  ],
})
export class AppModule {}
