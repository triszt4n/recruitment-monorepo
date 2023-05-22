import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserEntity } from 'src/users/dto/UserEntity.dto'
import { CreatePeriodDto } from './dto/CreatePeriod.dto'
import { PeriodEntity } from './dto/PeriodEntity.dto'
import { UpdatePeriodDto } from './dto/UpdatePeriod.dto'

@Injectable()
export class PeriodsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePeriodDto, user: UserEntity): Promise<PeriodEntity> {
    return this.prisma.period.create({
      data: {
        ...dto,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    })
  }

  async findAll(): Promise<PeriodEntity[]> {
    return this.prisma.period.findMany()
  }

  async findOne(id: number): Promise<PeriodEntity> {
    return this.prisma.period.findUnique({
      where: {
        id,
      },
    })
  }

  async update(id: number, dto: UpdatePeriodDto): Promise<PeriodEntity> {
    return this.prisma.period.update({
      where: {
        id,
      },
      data: dto,
    })
  }

  async remove(id: number): Promise<PeriodEntity> {
    return this.prisma.period.delete({ where: { id: id } })
  }
}
