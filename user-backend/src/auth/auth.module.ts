import { HttpModule } from '@nestjs/axios'
import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthschStrategy } from './authsch.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PrismaModule,
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2 days' },
    }),
    PassportModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthschStrategy, JwtStrategy, AuthService],
  exports: [],
})
export class AuthModule {}
