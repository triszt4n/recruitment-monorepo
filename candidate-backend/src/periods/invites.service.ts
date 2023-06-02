import { DaprClient } from '@dapr/dapr'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateInviteDto } from './dto/CreateInvite.dto'
import { InviteEntity } from './dto/InviteEntity.dto'
import { UpdateInviteDto } from './dto/UpdateInvite.dto'

const DAPR_HOST = process.env.DAPR_HOST || 'http://localhost'
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || '3500'
const PUBSUB_NAME = 'emailpubsub'
const PUBSUB_TOPIC = 'emails'

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
    const client = new DaprClient()

    await Promise.all(
      sendables.map(async (sendable) => {
        await client.pubsub.publish(PUBSUB_NAME, PUBSUB_TOPIC, {
          invites: [sendable],
          periodTitle: periodTitle,
        })
        console.log(
          'Published data: ' +
            JSON.stringify({
              invites: [sendable],
              periodTitle: periodTitle,
            }),
        )
      }),
    )

    return sendables
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
