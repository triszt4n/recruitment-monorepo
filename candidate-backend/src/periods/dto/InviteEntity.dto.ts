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

const CommunityString = [
  'ac',
  'bss',
  'ha5kfu',
  'lego',
  'kirdev',
  'mgmt',
  'sem',
  'spot',
  'schdesign',
]

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

  constructor(partial: Partial<InviteEntity>) {
    Object.assign(this, partial)
  }
}
