import { OmitType } from '@nestjs/swagger'
import { InviteEntity } from './InviteEntity.dto'

export class CreateInviteDto extends OmitType(InviteEntity, [
  'id',
  'isEmailSent',
]) {}
