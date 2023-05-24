import { Module } from '@nestjs/common'
import { AuthModule } from 'src/auth/auth.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { CandidatesController } from './candidates.controller'
import { CandidatesService } from './candidates.service'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
