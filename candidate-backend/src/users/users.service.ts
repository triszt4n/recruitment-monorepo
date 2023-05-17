import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/CreateUser.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto'
import { UserEntity } from './dto/UserEntity.dto'
import { UserProfileDto } from './dto/UserProfile.dto'

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async profile(oldUser: UserEntity): Promise<UserProfileDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: oldUser.id },
    })
    return {
      ...user,
      jwt:
        user.isAdmin !== oldUser.isAdmin
          ? this.jwtService.sign(user, {
              secret: process.env.JWT_SECRET,
              expiresIn: '2 days',
            })
          : undefined,
    }
  }

  async findByAuthSchId(authSchId: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { authSchId: authSchId } })
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({ data })
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({ data, where: { id: id } })
  }

  async promoteUser(id: number): Promise<UserEntity> {
    return this.prisma.user.update({
      data: { isAdmin: true },
      where: { id: id },
    })
  }

  async remove(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({ where: { id: id } })
  }
}
