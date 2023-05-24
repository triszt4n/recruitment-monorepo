import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class InviteEntity {
  @IsInt()
  @Min(1)
  id: number

  @IsNotEmpty()
  @IsEmail()
  supposedEmail: string

  @IsNotEmpty()
  supposedLastName: string

  @IsNotEmpty()
  supposedFirstName: string

  @IsArray()
  @IsString({ each: true, message: 'Each community must be a string' })
  communities: string[]

  @IsBoolean()
  needsOralExam = true

  @IsBoolean()
  @IsOptional()
  isEmailSent: boolean

  @IsInt()
  periodId: number

  constructor(partial: Partial<InviteEntity>) {
    Object.assign(this, partial)
  }
}
