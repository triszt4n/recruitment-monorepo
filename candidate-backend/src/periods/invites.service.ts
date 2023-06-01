import { Injectable } from '@nestjs/common'
import axios from 'axios'
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

  async findAllUnsentOfPeriod(periodId: number): Promise<InviteEntity[]> {
    return this.prisma.invite.findMany({
      where: {
        periodId,
        isEmailSent: false,
      },
    })
  }

  async sendInvitesViaMailingService(
    sendables: InviteEntity[],
    periodTitle: string,
  ): Promise<InviteEntity[]> {
    let successfulInviteIds: number[] = []
    try {
      successfulInviteIds = (
        await axios.post<number[]>(process.env.MAIL_SERVER_URL, {
          invites: sendables,
          periodTitle: periodTitle,
        })
      ).data
    } catch (error) {
      console.log(error)
    }
    return sendables.filter((invite) => successfulInviteIds.includes(invite.id))
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

  async updateMany(ids: number[], sentStatus = true): Promise<number> {
    const updated = await this.prisma.invite.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isEmailSent: sentStatus,
      },
    })
    return updated.count
  }

  async remove(id: number): Promise<InviteEntity> {
    return this.prisma.invite.delete({ where: { id: id } })
  }
}
