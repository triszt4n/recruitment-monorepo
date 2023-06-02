import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import axios from 'axios'
import { CandidatesService } from './candidates.service'
import { CandidateData } from './dto/CandidateData.dto'
import { CandidateEntity } from './dto/CandidateEntity.dto'
import { CreateCandidateDto } from './dto/CreateCandidate.dto'
import { InviteEntity } from './dto/InviteEntity.dto'
import { PeriodEntity } from './dto/PeriodEntity.dto'
import { UpdateCandidateDto } from './dto/UpdateCandidate.dto'

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  private readonly logger = new Logger(CandidatesController.name)

  @Post()
  async create(@Body() dto: CreateCandidateDto): Promise<CandidateEntity> {
    try {
      await axios.post<InviteEntity>(
        `${process.env.CANDIDATE_BACKEND_HOST}/invites/${dto.inviteId}/accept`,
      )
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException('Meghívó már el lett fogadva.')
    }
    const candidate = await this.candidatesService.create(dto)
    return candidate
  }

  @Get()
  async findAll(): Promise<CandidateEntity[]> {
    return this.candidatesService.findAll()
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CandidateEntity> {
    return this.candidatesService.findOne(id)
  }

  @Get('user/:userId')
  async findAllForUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<CandidateEntity[]> {
    return this.candidatesService.findAllForUser(userId)
  }

  @Get(':id/data')
  async findDataForOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CandidateData> {
    const candidate = await this.candidatesService.findOne(id)

    const { data: invite } = await axios.get<InviteEntity>(
      `${process.env.CANDIDATE_BACKEND_HOST}/invites/${candidate.inviteId}`,
    )
    const { data: period } = await axios.get<PeriodEntity>(
      `${process.env.CANDIDATE_BACKEND_HOST}/periods/${invite.periodId}`,
    )
    return new CandidateData({ candidate, invite, period })
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCandidateDto,
  ): Promise<CandidateEntity> {
    return this.candidatesService.update(id, dto)
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CandidateEntity> {
    return this.candidatesService.remove(id)
  }
}
