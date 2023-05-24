import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CandidateEntity } from './dto/CandidateEntity.dto'
import { CreateCandidateDto } from './dto/CreateCandidate.dto'
import { UpdateCandidateDto } from './dto/UpdateCandidate.dto'

@Injectable()
export class CandidatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCandidateDto): Promise<CandidateEntity> {
    return this.prisma.candidate.create({
      data: {
        inviteId: dto.inviteId,
        user: {
          connect: {
            id: dto.userId,
          },
        },
      },
    })
  }

  async findAll(): Promise<CandidateEntity[]> {
    return this.prisma.candidate.findMany()
  }

  async findAllForUser(userId: number): Promise<CandidateEntity[]> {
    return this.prisma.candidate.findMany({
      where: {
        userId,
      },
    })
  }

  async findOne(id: number): Promise<CandidateEntity> {
    return this.prisma.candidate.findUnique({
      where: {
        id,
      },
    })
  }

  async update(id: number, dto: UpdateCandidateDto): Promise<CandidateEntity> {
    return this.prisma.candidate.update({
      where: {
        id,
      },
      data: dto,
    })
  }

  async remove(id: number): Promise<CandidateEntity> {
    return this.prisma.candidate.delete({
      where: {
        id,
      },
    })
  }
}
