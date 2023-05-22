import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common'
import { JwtAuth } from 'src/auth/decorator/jwtAuth.decorator'
import { InviteEntity } from './dto/InviteEntity.dto'
import { UpdateInviteDto } from './dto/UpdateInvite.dto'
import { InvitesService } from './invites.service'

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @JwtAuth()
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

  @JwtAuth()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<InviteEntity> {
    return this.invitesService.remove(id)
  }
}
