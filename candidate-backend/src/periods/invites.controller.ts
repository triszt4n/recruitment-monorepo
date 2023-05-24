import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { JwtAuth } from 'src/auth/decorator/jwtAuth.decorator'
import { InviteEntity } from './dto/InviteEntity.dto'
import { UpdateInviteDto } from './dto/UpdateInvite.dto'
import { InvitesService } from './invites.service'

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<InviteEntity> {
    return this.invitesService.findOne(id)
  }

  @JwtAuth()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInviteDto,
  ): Promise<InviteEntity> {
    return this.invitesService.update(id, dto)
  }

  @Post(':id/accept')
  async accept(@Param('id', ParseIntPipe) id: number): Promise<InviteEntity> {
    const invite = await this.invitesService.findOne(id)
    if (invite.isAccepted) {
      throw new BadRequestException('Invite already accepted')
    }
    return this.invitesService.update(id, { isAccepted: true })
  }

  @JwtAuth()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<InviteEntity> {
    return this.invitesService.remove(id)
  }
}
