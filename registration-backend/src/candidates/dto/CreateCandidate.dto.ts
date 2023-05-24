import { IsInt } from 'class-validator'

export class CreateCandidateDto {
  @IsInt()
  inviteId: number

  @IsInt()
  userId: number
}
