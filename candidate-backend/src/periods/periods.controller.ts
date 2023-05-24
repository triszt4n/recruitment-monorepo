import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator'
import {
  JwtAuth,
  JwtOptionalAuthGuard,
} from 'src/auth/decorator/jwtAuth.decorator'
import { UserEntity } from 'src/users/dto/UserEntity.dto'
import { CreateInviteDto } from './dto/CreateInvite.dto'
import { CreatePeriodDto } from './dto/CreatePeriod.dto'
import { InviteEntity } from './dto/InviteEntity.dto'
import { PeriodEntity } from './dto/PeriodEntity.dto'
import { UpdatePeriodDto } from './dto/UpdatePeriod.dto'
import { InvitesService } from './invites.service'
import { PeriodsService } from './periods.service'

@Controller('periods')
export class PeriodsController {
  constructor(
    private readonly periodsService: PeriodsService,
    private readonly invitesService: InvitesService,
  ) {}

  @JwtAuth()
  @Post()
  async create(
    @Body() dto: CreatePeriodDto,
    @CurrentUser() user: UserEntity,
  ): Promise<PeriodEntity> {
    return this.periodsService.create(dto, user)
  }

  @UseGuards(JwtOptionalAuthGuard)
  @Get()
  async findAll(): Promise<PeriodEntity[]> {
    return this.periodsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PeriodEntity> {
    return this.periodsService.findOne(id)
  }

  @JwtAuth()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePeriodDto,
  ): Promise<PeriodEntity> {
    return this.periodsService.update(id, dto)
  }

  @JwtAuth()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<PeriodEntity> {
    return this.periodsService.remove(id)
  }

  /** ----------------------------------- Invite methods ------------------------------------ */

  @JwtAuth()
  @Get(':periodId/invites')
  async findInvites(
    @Param('periodId', ParseIntPipe) periodId: number,
  ): Promise<InviteEntity[]> {
    return this.invitesService.findAllOfPeriod(periodId)
  }

  @JwtAuth()
  @Post(':periodId/invites')
  async createInvite(
    @Param('periodId', ParseIntPipe) periodId: number,
    @Body() dto: CreateInviteDto,
  ): Promise<InviteEntity> {
    return this.invitesService.create(dto, periodId)
  }

  @JwtAuth()
  @Post(':periodId/invites/send')
  async sendUnsentInvites(
    @Param('periodId', ParseIntPipe) periodId: number,
  ): Promise<InviteEntity[]> {
    const sendables = await this.invitesService.findAllUnsentOfPeriod(periodId)
    const { title } = await this.periodsService.findOne(periodId)
    await this.invitesService.sendInvitesViaMailingService(sendables, title)
    await this.invitesService.updateMany(
      sendables.map((s) => s.id),
      true,
    )
    return sendables
  }
}
