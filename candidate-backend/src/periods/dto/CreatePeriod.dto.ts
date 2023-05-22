import { OmitType } from '@nestjs/swagger'
import { PeriodEntity } from './PeriodEntity.dto'

export class CreatePeriodDto extends OmitType(PeriodEntity, [
  'id',
  'isActive',
]) {}
