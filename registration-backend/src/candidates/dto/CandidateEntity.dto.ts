import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator'

export class CandidateEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsInt()
  inviteId: number

  @IsInt()
  userId: number

  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @IsString()
  nickName?: string

  @IsString()
  dormRoom?: string

  @IsString()
  @IsNotEmpty()
  neptunCode: string

  @IsString()
  @IsNotEmpty()
  universityFaculty: string

  @IsString()
  @IsNotEmpty()
  programmeName: string

  @IsString()
  @IsNotEmpty()
  programmeLevel: string

  @IsString()
  @IsNotEmpty()
  programmeStartSemester: string

  constructor(partial: Partial<CandidateEntity>) {
    Object.assign(this, partial)
  }
}
