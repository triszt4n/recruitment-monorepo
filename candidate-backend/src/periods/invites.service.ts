import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateInviteDto } from './dto/CreateInvite.dto'
import { InviteEntity } from './dto/InviteEntity.dto'
import { UpdateInviteDto } from './dto/UpdateInvite.dto'

@Injectable()
export class InvitesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInviteDto, periodId: number): Promise<InviteEntity> {
    return this.prisma.invite.create({
      data: {
        ...dto,
        period: {
          connect: {
            id: periodId,
          },
        },
      },
    })
  }

  async findAllOfPeriod(periodId: number): Promise<InviteEntity[]> {
    return this.prisma.invite.findMany({
      where: {
        periodId,
      },
    })
  }

  async findOne(id: number): Promise<InviteEntity> {
    return this.prisma.invite.findUnique({
      where: {
        id,
      },
    })
  }

  async update(id: number, dto: UpdateInviteDto): Promise<InviteEntity> {
    return this.prisma.invite.update({
      where: {
        id,
      },
      data: dto,
    })
  }

  async remove(id: number): Promise<InviteEntity> {
    return this.prisma.invite.delete({ where: { id: id } })
  }
}
