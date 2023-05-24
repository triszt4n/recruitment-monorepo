import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { InvitesController } from './invites.controller'
import { InvitesService } from './invites.service'
import { PeriodsController } from './periods.controller'
import { PeriodsService } from './periods.service'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PeriodsController, InvitesController],
  providers: [PeriodsService, InvitesService],
})
export class PeriodsModule {}
