import { PartialType } from '@nestjs/swagger'
import { CandidateEntity } from './CandidateEntity.dto'

export class UpdateCandidateDto extends PartialType(CandidateEntity) {}
