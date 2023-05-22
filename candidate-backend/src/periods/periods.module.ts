import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { InvitesService } from './invites.service'
import { PeriodsController } from './periods.controller'
import { PeriodsService } from './periods.service'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PeriodsController],
  providers: [PeriodsService, InvitesService],
})
export class PeriodsModule {}
