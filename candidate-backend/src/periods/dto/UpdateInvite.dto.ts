import { PartialType } from '@nestjs/swagger'
import { CreateInviteDto } from './CreateInvite.dto'

export class UpdateInviteDto extends PartialType(CreateInviteDto) {}
