import { PartialType } from '@nestjs/swagger'
import { CreatePeriodDto } from './CreatePeriod.dto'

export class UpdatePeriodDto extends PartialType(CreatePeriodDto) {}
