import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { CandidatesModule } from './candidates/candidates.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, CandidatesModule],
})
export class AppModule {}
